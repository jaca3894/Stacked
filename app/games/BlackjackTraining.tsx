import React, { useEffect, useReducer, useRef, useState } from "react";
import { StyleSheet, View, Image, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RouteProp, useRoute } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";

import RootStackParamList from "../../props/RootStackParamList";
import Deck from "../../classes/Deck"; // Zakładam, że dodałeś wcześniej
import Card from "../../classes/Card";
import BlackjackPlayer from "../../classes/BlackjackPlayer";

import PlayerStatus from "../../components/PlayerStatus";
import ActionBar from "../../components/ActionBar";
import BetInput from "../../components/BetInput";
import Toast from "react-native-toast-message";
import toastConfig from "../../config/ToastConfig";
import * as NavigationBar from "expo-navigation-bar";
import BlackjackWinModal from "../panels/BlackjackWinModal";
import { useLanguage } from "../../hooks/useLanguage";

type GameRouteProp = RouteProp<RootStackParamList, "BlackjackTraining">;

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

const BlackjackTraining = () => {
  const { language } = useLanguage();
  const route = useRoute<GameRouteProp>();
  const {
    initialBalance,
    insuranceEnabled,
    doubleEnabled,
    autoHitOnSeventeenEnabled,
  } = route.params;

  const player = useRef<BlackjackPlayer>(
    new BlackjackPlayer(language === "pl" ? "Gracz" : "Player", initialBalance)
  );
  const dealer = useRef<BlackjackPlayer>(
    new BlackjackPlayer(
      language === "pl" ? "Krupier" : "Dealer",
      initialBalance * 10
    )
  );

  const deck = useRef<Deck>(new Deck());
  const [started, setStarted] = useState(false);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [playerMoveFinished, setPlayerMoveFinished] = useState(false);
  const [insuranceTaken, setInsuranceTaken] = useState(false);
  const [isDoubled, setIsDoubled] = useState(false);
  const [revealDealerCard, setRevealDealerCard] = useState(false);
  const [blackjackWin, setBlackjackWin] = useState(false);

  useEffect(() => {
    // Zablokuj orientację poziomą
    // StatusBar.setHidden(true);
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    if (Platform.OS === "android") {
      NavigationBar.setVisibilityAsync("hidden");
    }

    // Przywróć domyślną orientację po opuszczeniu widoku
    return () => {
      ScreenOrientation.unlockAsync(); // lub OrientationLock.DEFAULT
    };
  }, []);

  const startGame = async () => {
    setPlayerMoveFinished(false);
    setRevealDealerCard(false);
    setInsuranceTaken(false);
    setIsDoubled(false);
    deck.current.reset();
    deck.current.shuffle();

    player.current.resetHand();
    dealer.current.resetHand();
    forceUpdate();

    player.current.addCard(deck.current.draw()!);
    dealer.current.addCard(deck.current.draw()!);
    player.current.addCard(deck.current.draw()!);
    dealer.current.addCard(deck.current.draw()!);

    setStarted(true);

    if (
      player.current.getHandValue().includes(21) &&
      player.current.hand.length === 2
    ) {
      await sleep(300);
      setBlackjackWin(true);

      player.current.give(player.current.currentBet * 2.5); // 3:2
      dealer.current.take(player.current.currentBet * 2.5); // 3:2
      setStarted(false);
    }
  };

  const handleHit = async (_player: string) => {
    let playerObj =
      _player === (language === "pl" ? "Krupier" : "Dealer") ? dealer : player;
    playerObj.current.addCard(deck.current.draw()!);

    const value = checkHandValue(player);
    if (value > 21) handleBust(_player);
    else if (value === 21) {
      Toast.show({
        type: "info",
        text1: language === "pl" ? "Trafiłeś 21!" : "You hit 21!",
        text2: language === "pl" ? "Tura krupiera!" : "Dealer's turn!",
      });
      setPlayerMoveFinished(true);
      handleDealerAI();
      return;
    } else {
      await sleep(500);
      // correct hit
      forceUpdate();
    }
  };

  const handleBust = (_player: string) => {
    if (_player != (language === "pl" ? "Krupier" : "Dealer")) {
      setPlayerMoveFinished(true);
      // kasa juz jest u dealera wiec nie trzeba mu dawac
      // dealer.current.give(
      //   isDoubled ? player.current.currentBet / 2 : player.current.currentBet
      // );
      Toast.show({
        type: "error",
        text1:
          language === "pl" ? "Przekroczyłeś 21! 💔🥀" : "You busted! 💔🥀",
        text2: `-${player.current.currentBet - player.current.insuranceBet}`,
      });
      setStarted(false);
    } else {
      Toast.show({
        type: "success",
        text1: language === "pl" ? "Wygrałeś! 🤑" : "You win! 🤑",
        text2: `+${player.current.currentBet}`,
      });

      player.current.give(player.current.currentBet * 2);
      dealer.current.take(player.current.currentBet * 2);
      setStarted(false);
    }
  };

  const handleDealerAI = async () => {
    await sleep(700);
    setRevealDealerCard(true);
    while (true) {
      const dealerValue = dealer.current.getHandValue();
      const bestValue = Math.max(...dealerValue.filter((v) => v <= 21));

      // Jeśli dealer przekroczył 21 — zakończ ruch
      if (dealerValue.every((v) => v > 21)) {
        handleBust("Dealer");
        Toast.show({
          type: "success",
          text1: language === "pl" ? "Wygrałeś 🤑" : "You win! 🤑",
          text2: `+${player.current.currentBet}`,
        });
        return;
      }

      // Jeśli dealer ma 17+ i nie musi dobierać — koniec
      if (
        bestValue > 17 ||
        (bestValue === 17 &&
          (!autoHitOnSeventeenEnabled ||
            !dealer.current.isSoft17(dealer.current.hand)))
      ) {
        break;
      }

      // Dobieramy jedną kartę i aktualizujemy UI
      await sleep(1000);
      dealer.current.addCard(deck.current.draw()!);
      forceUpdate();
    }
    endGame();
  };

  const getBestHandValue = (values: number[]) => {
    return Math.max(...values.filter((v) => v <= 21));
  };

  const endGame = async () => {
    await sleep(300); // suspense przed ogłoszeniem wygranej/przegranej

    const playerValue = getBestHandValue(player.current.getHandValue());
    const dealerValue = getBestHandValue(dealer.current.getHandValue());
    const bet = player.current.currentBet;

    if (playerValue === dealerValue) {
      player.current.give(bet);
      dealer.current.take(bet);
      Toast.show({
        type: "info",
        text1: language === "pl" ? "Remis 🤝" : "Push 🤝",
        text2:
          language === "pl"
            ? "Twój zakład został zwrócony."
            : "Your bet has been returned",
      });
    } else if (playerValue > dealerValue) {
      if (dealer.current.balance < bet * 2) {
        await sleep(600);
        Toast.show({
          type: "error",
          text1:
            language === "pl"
              ? "Krupier nie może wypłacić 😱"
              : "Dealer can't pay 😱",
          text2:
            language === "pl"
              ? "Zbankrutowałeś krupiera!"
              : "You've bankrupted the house!",
        });
        return;
      }

      player.current.give(bet * 2);
      dealer.current.take(bet * 2);
      await sleep(600);
      Toast.show({
        type: "success",
        text1: language === "pl" ? "Wygrałeś! 🤑" : "You win! 🤑",
        text2: `+${bet}`,
      });
    } else {
      await sleep(600);
      Toast.show({
        type: "error",
        text1: language === "pl" ? "Krupier wygrywa 💔🥀" : "Dealer wins 💔🥀",
        text2: `-${bet}`,
      });
    }

    player.current.currentBet = 0;
    setStarted(false);
  };

  const handleStand = async () => {
    setPlayerMoveFinished(true);
    sleep(300);
    handleDealerAI();
  };

  const handleDouble = async () => {
    setIsDoubled(true);

    const bet = player.current.currentBet - player.current.insuranceBet;

    // Zmiana stanu
    player.current.take(bet);
    dealer.current.give(bet);
    player.current.currentBet = bet * 2;

    // Dobierz kartę
    player.current.addCard(deck.current.draw()!);
    const value = checkHandValue(player);

    forceUpdate();
    await sleep(500); // dla dramaturgii

    if (value > 21) {
      Toast.show({
        type: "error",
        text1:
          language === "pl"
            ? "Przekroczyłeś 21 na double! 💔🥀"
            : "You busted on double! 💔",
        text2: `-${bet}`,
      });
      setPlayerMoveFinished(true);
      setStarted(false);
      return;
    }

    setPlayerMoveFinished(true);
    handleDealerAI();
  };

  const handleInsurance = () => {
    if (insuranceTaken) return;
    setInsuranceTaken(true);

    const insuranceBet = player.current.currentBet / 2;
    if (player.current.balance < insuranceBet) {
      Toast.show({
        type: "error",
        text1: language === "pl" ? "Przepraszamy! 😭" : "Sorry! 😭",
        text2:
          language === "pl"
            ? "Zbyt mało żetonów na ubezpieczenie."
            : "Not enough chips to insure.",
      });
      return;
    }

    player.current.insuranceBet = insuranceBet;
    // Pobranie ubezpieczenia
    player.current.take(insuranceBet);
    dealer.current.give(insuranceBet);
    // Ujawnienie karty krupiera
    setRevealDealerCard(true);
    forceUpdate();

    // Sprawdzenie, czy krupier ma Blackjack
    const dealerHasBJ =
      dealer.current.getHandValue().includes(21) &&
      dealer.current.hand.length === 2;

    if (dealerHasBJ) {
      // Ubezpieczenie wygrywa 2:1
      player.current.give(insuranceBet * 3);
      dealer.current.take(insuranceBet * 3);
      Toast.show({
        type: "success",
        text1:
          language === "pl"
            ? "Krupier ma Blackjacka!"
            : "Dealer has Blackjack!",
        text2:
          language === "pl"
            ? "Ubezpieczenie się opłaciło! 💰"
            : "Insurance paid off 💰",
      });

      // Główna stawka: gracz ją już utracił przy licytacji,
      // więc nie robimy tu żadnej dodatkowej operacji.

      // Zakończ rundę
      setStarted(false);
    } else {
      Toast.show({
        type: "info",
        text2:
          language === "pl"
            ? "Krupier nie ma Blackjacka."
            : "Dealer doesn't have Blackjack",
        text1:
          language === "pl"
            ? "Ubezpieczenie nietrafione 😬"
            : "Insurance lost 😬",
      });
      // Gra toczy się dalej, gracz może hit/stand/double…
    }
  };

  const checkHandValue = (player: React.RefObject<BlackjackPlayer>) => {
    const playerHand = player.current.hand;
    let sum = 0;
    let aces = 0;
    playerHand.forEach((card: Card) => {
      switch (card.rank) {
        case "A":
          sum += 11;
          aces++;
          break;
        case "J":
        case "K":
        case "Q":
          sum += 10;
          break;
        default:
          sum += parseInt(card.rank);
      }
    });
    if (sum > 21 && aces > 0) {
      while (sum > 21 && aces > 0) {
        sum -= 10;
        aces--;
      }
    }

    return sum;
  };

  return (
    <SafeAreaProvider>
      {/* <StatusBar hidden /> */}
      <View style={styles.safeArea}>
        {/* Czerwony górny plan — dealer */}
        <View style={styles.secondPlane}>
          <Image
            source={require("../../assets/dealer/dealer.png")}
            style={styles.dealer}
          />
          {/* Możesz tu dodać obraz dealera */}
        </View>

        {/* Zielony stół — gracz + akcje */}
        <View style={styles.table}>
          <View style={[styles.uiLayer, { flexDirection: "row" }]}>
            {/* Lewa kolumna — PlayerStatus */}
            <View style={styles.tableSide}>
              <PlayerStatus
                name={language === "pl" ? "Ty" : "You"}
                balance={player.current.balance}
                hand={player.current.hand}
                points={player.current.getHandValue().join(" / ")}
                isFirstDeal={
                  !playerMoveFinished && dealer.current.hand.length === 2
                }
              />
            </View>

            {/* Środkowa kolumna — BetInput LUB ActionBar */}
            <View style={styles.tableCenter}>
              {!started ? (
                <BetInput
                  max={player.current.balance}
                  onConfirm={(amount) => {
                    if (dealer.current.balance < amount * 2.5) {
                      Toast.show({
                        type: "error",
                        text1:
                          language === "pl"
                            ? "Krupier nie potrafi wypłacić tego zakładu 💸"
                            : "Dealer can't cover this bet 💸",
                        text2:
                          language === "pl"
                            ? "Zmniejsz stawkę lub zrestartuj stół."
                            : "Lower your stake or reset table.",
                      });
                      return;
                    }
                    if (dealer.current.balance <= 0) {
                      setStarted(false);
                      Toast.show({
                        type: "success",
                        text1:
                          language === "pl"
                            ? "Ograłeś krupiera do zera! 🎉"
                            : "You've cleaned out the dealer! 🎉",
                        text2:
                          language === "pl"
                            ? "Krupier nie ma już żetonów."
                            : "No more chips in the house.",
                      });
                      return;
                    }

                    player.current.take(amount);
                    player.current.currentBet = amount;
                    dealer.current.give(amount);
                    startGame();
                  }}
                />
              ) : (
                !playerMoveFinished && (
                  <ActionBar
                    onHit={() =>
                      handleHit(language === "pl" ? "Gracz" : "Player")
                    }
                    onStand={handleStand}
                    onDouble={handleDouble}
                    onInsurance={handleInsurance}
                    canDouble={
                      doubleEnabled && player.current.hand.length === 2
                    }
                    canInsure={
                      insuranceEnabled &&
                      dealer.current.hand[0].rank === "A" &&
                      !insuranceTaken
                    }
                  />
                )
              )}
            </View>

            {/* Prawa kolumna — DealerStatus */}
            <View style={styles.tableSide}>
              <PlayerStatus
                name={language === "pl" ? "Krupier" : "Dealer"}
                balance={dealer.current.balance}
                hand={dealer.current.hand}
                points={dealer.current.getHandValue().join(" / ")}
                hideSecondCard={started && !revealDealerCard}
                isFirstDeal={
                  !playerMoveFinished && dealer.current.hand.length === 2
                }
              />
            </View>
          </View>
        </View>
      </View>
      <BlackjackWinModal
        visible={blackjackWin}
        onDismiss={() => setBlackjackWin(false)}
      />
      <Toast config={toastConfig} swipeable />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
    position: "relative",
    zIndex: 1,
  },
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "80%",
    alignSelf: "flex-end",
  },
  backgroundImage: {
    flex: 1,
    zIndex: 0,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // resizeMode: "contain",
  },
  uiLayer: {
    height: "100%",
    justifyContent: "space-between",
    paddingVertical: 24,
    // paddingHorizontal: 32,
    marginTop: 10,
    zIndex: 2,
  },
  table: {
    backgroundColor: "green",
    width: "90%",
    alignSelf: "center",
    height: "50%",
    // alignSelf: "flex-end",
    top: "50%",
    zIndex: 1,
    borderWidth: 7,
    borderColor: "#4d342f",
    outlineColor: "#2e1c1c",
    outlineWidth: 7,
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
  },
  secondPlane: {
    position: "absolute",
    width: "100%",
    height: "45%",
    top: "15%",
    backgroundColor: "transparent",
    // alignSelf: "flex-end",
    alignItems: "flex-start",
    // zIndex: 2,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFD700",
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 18,
    color: "#222",
    fontWeight: "bold",
  },
  hands: {
    marginTop: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
    color: "#fff",
  },
  tableSide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  tableCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dealer: {
    width: "50%",
    height: "105%",
    resizeMode: "contain",
    // position: "absolute",
    zIndex: 5,
    alignSelf: "center",
    bottom: 0,
    left: 0,
  },
});

export default BlackjackTraining;
