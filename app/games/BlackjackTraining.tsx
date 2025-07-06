import React, { useEffect, useReducer, useRef, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useRoute } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";

import RootStackParamList from "../../props/RootStackParamList";
import Svg, { Rect } from "react-native-svg";
import Player from "../../classes/Player";
import Deck from "../../classes/Deck"; // Zakładam, że dodałeś wcześniej
import Card from "../../classes/Card";
import BlackjackPlayer from "../../classes/BlackjackPlayer";

import PlayerStatus from "../../components/PlayerStatus";
import ActionBar from "../../components/ActionBar";
import BetInput from "../../components/BetInput";
import Toast from "react-native-toast-message";
import toastConfig from "../../config/ToastConfig";
type GameRouteProp = RouteProp<RootStackParamList, "BlackjackTraining">;

const BlackjackTraining = () => {
  const route = useRoute<GameRouteProp>();
  const {
    initialBalance,
    insuranceEnabled,
    doubleEnabled,
    autoHitOnSeventeenEnabled,
  } = route.params;

  // console.log(`double: ${doubleEnabled}, insurance: ${insuranceEnabled}`);
  const player = useRef<BlackjackPlayer>(
    new BlackjackPlayer("Player", initialBalance)
  );
  const dealer = useRef<BlackjackPlayer>(new BlackjackPlayer("Dealer", 20));
  // const [dealer, setDealer] = useState<Player>(new Player("Krupier"));
  const deck = useRef<Deck>(new Deck());
  const [started, setStarted] = useState(false);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [playerMoveFinished, setPlayerMoveFinished] = useState(false);
  const [insuranceTaken, setInsuranceTaken] = useState(false);
  const [isDoubled, setIsDoubled] = useState(false);
  const [revealDealerCard, setRevealDealerCard] = useState(false);

  useEffect(() => {
    // Zablokuj orientację poziomą
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    // Przywróć domyślną orientację po opuszczeniu widoku
    return () => {
      ScreenOrientation.unlockAsync(); // lub OrientationLock.DEFAULT
    };
  }, []);

  const startGame = () => {
    console.log("-----------------NEW GAME---------------------");
    // player.current.currentBet = 0;
    setPlayerMoveFinished(false);
    setRevealDealerCard(false);
    setInsuranceTaken(false);
    setIsDoubled(false);
    deck.current.reset();
    deck.current.shuffle();
    // player.current.currentBet = 0;

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
      Toast.show({
        type: "success",
        text1: "Blackjack!",
        text2: "3:2 payout 💰",
      });
      console.log(`Giving player: ${player.current.currentBet * 2.5}`);
      player.current.give(player.current.currentBet * 2.5); // 3:2
      console.log(`Taking dealer: ${player.current.currentBet * 2.5}`);
      dealer.current.take(player.current.currentBet * 2.5); // 3:2
      setStarted(false);
      return;
    }
    // setPlayer(player);
  };

  const handleHit = (_player: string) => {
    let playerObj = _player === "Dealer" ? dealer : player;

    playerObj.current.addCard(deck.current.draw()!);
    console.log(`Hand value: ${checkHandValue(player)}`);

    const value = checkHandValue(player);
    if (value > 21) {
      handleBust(_player);
      return;
    } else if (value === 21) {
      Toast.show({
        type: "info",
        text1: "You hit 21!",
        text2: "Dealer’s turn!",
      });
      setPlayerMoveFinished(true);
      handleDealerAI();
      return;
    } else {
      // correct hit
      forceUpdate();
    }
  };

  const handleBust = (_player: string) => {
    if (_player != "Dealer") {
      setPlayerMoveFinished(true);
      // kasa juz jest u dealera wiec nie trzeba mu dawac
      // dealer.current.give(
      //   isDoubled ? player.current.currentBet / 2 : player.current.currentBet
      // );
      console.log("you busted");
      Toast.show({
        type: "error",
        text1: "You busted! 🤝",
        text2: `-${player.current.currentBet}`,
      });
      setStarted(false);
      // player.current.busted = true;
    } else {
      console.log("dealer busted");
      Toast.show({
        type: "success",
        text1: "You win! 🤝",
        text2: `+${player.current.currentBet}`,
      });
      console.log(`player: ${player.current.name}`);
      console.log(`Giving player: ${player.current.currentBet}`);

      player.current.give(player.current.currentBet * 2);
      console.log(`Taking dealer: ${player.current.currentBet}`);
      dealer.current.take(player.current.currentBet * 2);
      setStarted(false);
      return;
    }
    return;
  };

  const handleDealerAI = () => {
    while (true) {
      const dealerValue = dealer.current.getHandValue();
      const bestValue = Math.max(...dealerValue.filter((v) => v <= 21));

      // Jeśli dealer przekroczył 21 — zakończ ruch
      if (dealerValue.every((v) => v > 21)) {
        handleBust("Dealer");
        Toast.show({
          type: "success",
          text1: "You win! 🤝",
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
      dealer.current.addCard(deck.current.draw()!);
      forceUpdate();
    }

    endGame();

    // if (!dealer.current.isBusted()) {
    //   endGame();
    // }
  };

  const getBestHandValue = (values: number[]) => {
    return Math.max(...values.filter((v) => v <= 21));
  };

  const endGame = () => {
    const playerValue = getBestHandValue(player.current.getHandValue());
    const dealerValue = getBestHandValue(dealer.current.getHandValue());
    const bet = player.current.currentBet;

    if (playerValue === dealerValue) {
      console.log("draw (push)");
      console.log(`Giving player: ${bet}`);
      player.current.give(bet);
      console.log(`Taking dealer: ${bet}`);
      dealer.current.take(bet);
      Toast.show({
        type: "info",
        text1: "Push 🤝",
        text2: "Your bet has been returned",
      });
    } else if (playerValue > dealerValue) {
      console.log("player won");
      if (dealer.current.balance < bet * 2) {
        Toast.show({
          type: "error",
          text1: "Dealer can't pay 😱",
          text2: "You've bankrupted the house!",
        });
      }

      console.log(`Giving player: ${bet * 2}`);
      player.current.give(bet * 2);
      console.log(`Taking dealer: ${bet * 2}`);
      dealer.current.take(bet * 2);
      Toast.show({
        type: "success",
        text1: "You win! 🎉",
        text2: `+${bet}`,
      });
    } else {
      console.log("dealer won");
      Toast.show({
        type: "error",
        text1: "Dealer wins 😔",
        text2: `-${bet}`,
      });
    }

    player.current.currentBet = 0;
    setStarted(false);
  };

  // const resetGame = () => {
  //   dealer.current.resetHand();
  //   player.current.resetHand();
  //   setInsuranceTaken(false);
  //   setIsDoubled(false);
  //   startGame();
  // };

  const handleStand = () => {
    setPlayerMoveFinished(true);
    handleDealerAI();
    return;
  };

  const handleDouble = () => {
    setIsDoubled(true);
    const bet = player.current.currentBet - player.current.insuranceBet;

    console.log("IM IN DOUBLE");
    console.log(
      `[DEBUG] currentBet before double: ${player.current.currentBet}`
    );
    console.log(`[DEBUG] insuranceBet: ${player.current.insuranceBet}`);

    console.log(`Taking player in double: ${bet}`);
    player.current.take(bet);
    console.log(`Giving dealer in double: ${bet}`);
    dealer.current.give(bet);
    player.current.currentBet = bet * 2;
    handleHit("Player");
    if (player.current.isBusted()) {
      Toast.show({
        type: "error",
        text1: "Dealer wins 😔",
        text2: ``,
      });
      setPlayerMoveFinished(true);
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
      Toast.show({ type: "error", text1: "Not enough chips to insure 💸" });
      return;
    }

    player.current.insuranceBet = insuranceBet;
    // Pobranie ubezpieczenia
    console.log(`Taking player: ${insuranceBet}`);
    player.current.take(insuranceBet);
    console.log(`Giving dealer: ${insuranceBet}`);
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
      console.log(`Giving player: ${insuranceBet * 3}`);
      player.current.give(insuranceBet * 3);
      console.log(`Taking dealer: ${insuranceBet * 3}`);
      dealer.current.take(insuranceBet * 3);
      Toast.show({
        type: "success",
        text1: "Dealer has Blackjack!",
        text2: "Insurance paid off 💰",
      });

      // Główna stawka: gracz ją już utracił przy licytacji,
      // więc nie robimy tu żadnej dodatkowej operacji.

      // Zakończ rundę
      setStarted(false);
    } else {
      Toast.show({
        type: "info",
        text1: "Dealer doesn’t have Blackjack",
        text2: "Insurance lost 😬",
      });
      // Gra toczy się dalej, gracz może hit/stand/double…
    }
  };

  const checkHandValue = (player: React.RefObject<BlackjackPlayer>) => {
    const playerHand = player.current.hand;
    var sum = 0;
    var aces = 0;
    playerHand.forEach((card: Card) => {
      switch (card.rank) {
        case "A":
          {
            sum += 11;
            aces++;
          }
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
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* SVG background */}
          <Svg
            style={styles.background}
            viewBox="0 0 1800 800"
            preserveAspectRatio="xMidYMid meet"
          >
            <Rect
              x={0}
              y={0}
              width={1200}
              height={600}
              rx={180}
              ry={300}
              fill="#2E1C1C"
            />
            <Rect
              x={20}
              y={20}
              width={1160}
              height={560}
              rx={160}
              ry={280}
              fill="#4d342f"
            />
            <Rect
              x={40}
              y={40}
              width={1120}
              height={520}
              rx={140}
              ry={260}
              fill="#006400"
            />
            <Rect
              x={200}
              y={150}
              width={800}
              height={300}
              rx={100}
              ry={180}
              fill="none"
              stroke="#005000"
              strokeWidth={12}
            />
          </Svg>

          {/* Game UI */}
          <View style={styles.uiLayer}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <PlayerStatus
                name="Player"
                balance={player.current.balance}
                hand={player.current.hand}
                points={player.current.getHandValue().join(" / ")}
                isFirstDeal={
                  !playerMoveFinished && dealer.current.hand.length === 2
                }
              />
              <PlayerStatus
                name="Dealer"
                balance={dealer.current.balance}
                hand={dealer.current.hand}
                points={dealer.current.getHandValue().join(" / ")}
                hideSecondCard={started && !revealDealerCard}
                isFirstDeal={
                  !playerMoveFinished && dealer.current.hand.length === 2
                }
              />
            </View>

            {!started && (
              <>
                <BetInput
                  max={player.current.balance}
                  onConfirm={(amount) => {
                    if (dealer.current.balance < amount * 2.5) {
                      Toast.show({
                        type: "error",
                        text1: "Dealer can't cover this bet 💸",
                        text2: "Lower your stake or let them recover!",
                      });
                      return; // Przerwij start gry
                    }
                    if (dealer.current.balance <= 0) {
                      setStarted(false);
                      Toast.show({
                        type: "success",
                        text1: "🎉 You've cleaned out the dealer!",
                        text2: "No more chips in the house.",
                      });
                      return;
                    }

                    // console.log("amount" + amount);
                    console.log(`Taking player: ${amount}`);
                    player.current.take(amount);
                    player.current.currentBet = amount;
                    console.log(`Giving dealer: ${amount}`);
                    dealer.current.give(amount);
                    // console.log("bet" + player.current.currentBet);
                    startGame();
                    // Twoja logika tutaj:
                    // - player.current.take(amount)
                    // - player.current.currentBet = amount
                    // - rozdaj karty
                    // - setStarted(true)
                  }}
                />
              </>
            )}
            {started && (
              <>
                {!playerMoveFinished && (
                  <ActionBar
                    onHit={() => {
                      /* TODO: connect - logic */
                      handleHit("Player");
                    }}
                    onStand={() => {
                      handleStand();
                    }}
                    onDouble={() => {
                      /* TODO: connect handleDouble */
                      handleDouble();
                    }}
                    onInsurance={() => {
                      /* TODO: connect handleInsurance */
                      handleInsurance();
                    }}
                    canDouble={
                      doubleEnabled && player.current.hand.length === 2
                    }
                    canInsure={
                      insuranceEnabled &&
                      dealer.current.hand[0].rank === "A" &&
                      !insuranceTaken
                    }
                  />
                )}
              </>
            )}
          </View>
        </View>
      </SafeAreaView>
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0e0e0e",
    position: "relative",
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
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
  },
  uiLayer: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 24,
    paddingHorizontal: 32,
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
});

export default BlackjackTraining;
