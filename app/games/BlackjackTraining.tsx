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

  console.log(`double: ${doubleEnabled}, insurance: ${insuranceEnabled}`);
  const player = useRef<BlackjackPlayer>(
    new BlackjackPlayer("Player", initialBalance)
  );
  const dealer = useRef<BlackjackPlayer>(
    new BlackjackPlayer("Dealer", 1000000)
  );
  // const [dealer, setDealer] = useState<Player>(new Player("Krupier"));
  const deck = useRef<Deck>(new Deck());
  const [started, setStarted] = useState(false);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [playerMoveFinished, setPlayerMoveFinished] = useState(false);
  const [insuranceTaken, setInsuranceTaken] = useState(false);

  // useEffect(() => {
  //   ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  //   return () => {
  //     ScreenOrientation.unlockAsync();
  //   };
  // }, []);

  const startGame = () => {
    deck.current.reset();
    deck.current.shuffle();

    player.current.resetHand();
    dealer.current.resetHand();

    player.current.addCard(deck.current.draw()!);
    dealer.current.addCard(deck.current.draw()!);
    player.current.addCard(deck.current.draw()!);
    dealer.current.addCard(deck.current.draw()!);

    // setPlayer(player);

    setStarted(true);
  };

  const handleHit = (player: React.RefObject<BlackjackPlayer>) => {
    player.current.addCard(deck.current.draw()!);
    console.log(`Hand value: ${checkHandValue(player)}`);

    const value = checkHandValue(player);
    if (value > 21) {
      handleBust(player);
      return;
    } else if (value === 21) {
      // handle blackjack
    } else {
      // correct hit
      forceUpdate();
    }
  };

  const handleBust = (player: React.RefObject<BlackjackPlayer>) => {
    if (player.current.name != "Dealer") {
      setPlayerMoveFinished(true);
      dealer.current.give(player.current.currentBet);
      // player.current.busted = true;
    } else {
      player.current.give(player.current.currentBet * 2);
      dealer.current.take(player.current.currentBet * 2);
    }
    return;
  };

  const handleStand = () => {
    setPlayerMoveFinished(true);
    // start ai dealer
    return;
  };

  const handleDouble = () => {
    console.log(player.current.balance);
    console.log(player.current.currentBet);
    if (player.current.balance < player.current.currentBet) {
      Toast.show({ type: "error", text1: "Not enough chips to double 💸" });
      return;
    }
    player.current.take(player.current.currentBet);
    player.current.currentBet *= 2;
    handleHit(player);
    setPlayerMoveFinished(true);
    return;
  };

  const handleInsurance = () => {
    // przez 2 bo insurancebet to polowa glownego
    const insuranceBet = player.current.currentBet / 2;
    if (player.current.balance < insuranceBet) {
      Toast.show({ type: "error", text1: "Not enough chips to insure 💸" });
      return;
    }

    player.current.take(insuranceBet);
    setInsuranceTaken(true);

    // Sprawdź, czy dealer ma blackjacka:
    if (dealer.current.getHandValue().includes(21)) {
      player.current.give(insuranceBet * 2);
      Toast.show({
        type: "success",
        text1: "Dealer has Blackjack!",
        text2: "Insurance paid off 💰",
      });
      setStarted(false); // Runda kończy się
    } else {
      Toast.show({
        type: "info",
        text1: "Dealer doesn’t have Blackjack",
        text2: "Insurance lost 😬",
      });
      // gra toczy się dalej
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
            viewBox="0 0 1200 600"
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
            {!started && (
              <BetInput
                max={player.current.balance}
                onConfirm={(amount) => {
                  console.log("amount" + amount);
                  player.current.take(amount);
                  player.current.currentBet = amount;
                  console.log("bet" + player.current.currentBet);
                  startGame();
                  // Twoja logika tutaj:
                  // - player.current.take(amount)
                  // - player.current.currentBet = amount
                  // - rozdaj karty
                  // - setStarted(true)
                }}
              />
            )}
            {started && (
              <>
                <PlayerStatus
                  name="Dealer"
                  balance={dealer.current.balance}
                  hand={dealer.current.hand}
                  points={dealer.current.getHandValue().join(" / ")}
                />
                <PlayerStatus
                  name="Player"
                  balance={player.current.balance}
                  hand={player.current.hand}
                  points={player.current.getHandValue().join(" / ")}
                />
                {!playerMoveFinished && (
                  <ActionBar
                    onHit={() => {
                      /* TODO: connect handleHit logic */
                      handleHit(player);
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
                      insuranceEnabled && dealer.current.hand[0].rank === "A"
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
    position: "absolute",
    bottom: 60,
    left: 80,
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
