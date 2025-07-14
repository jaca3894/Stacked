import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  Dimensions,
  TextInput,
  Modal,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useRoute } from "@react-navigation/native";
import Player from "../../classes/Player";
import { Svg, Path, Rect } from "react-native-svg";

import RootStackParamList from "../../props/RootStackParamList";

import CustomSlider from "../../components/Slider";
import ActionButton from "../../components/ActionButton";
import CardBackView from "../../components/CardBackView";
import PotsShowdown from "../../components/PotsShowdown";
import PlayerButton from "../../components/PlayerButton";

const seatingPlan: Record<number, [number, number, number, number]> = {
  1: [1, 0, 0, 0],
  2: [0, 1, 0, 1],
  3: [1, 1, 0, 1],
  4: [0, 2, 0, 2],
  5: [0, 3, 0, 2],
  6: [0, 3, 0, 3],
  7: [0, 4, 0, 3],
  8: [0, 4, 0, 4],
  9: [1, 4, 0, 4],
  10: [1, 4, 1, 4],
  11: [2, 4, 1, 4],
  12: [2, 4, 2, 4],
};

type EdgeConfig = {
  pos: { [key: string]: number | string };
  dir: "row" | "column";
  len: number;
  addStyle?: object;
};

const screenWidth = Dimensions.get("window").width;

type GameRouteProp = RouteProp<RootStackParamList, "Game">;

const PokerGame = () => {
  const route = useRoute<GameRouteProp>();
  const { playersCount, initialBalance, smallBlindAmount, bigBlindAmount } =
    route.params;

  const [players, setPlayers] = useState<Player[]>(
    Array.from(
      { length: seatingPlan[playersCount].reduce((acc, val) => acc + val, 0) },
      () => new Player("", initialBalance)
    )
  );
  const [top, right, bottom, left] = seatingPlan[players.length];
  const [minAmount, setMinAmount] = useState<number>(bigBlindAmount);
  const [shownCards, setShownCards] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(-1);
  const [biggestBetPlayerIndex, setBiggestBetPlayerIndex] = useState(-1);

  const [canRaise, setCanRaise] = useState(false);

  const [showInput, setShowInput] = useState([false, -1]);
  const [inputValue, setInputValue] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [startNewGame, setStartNewGame] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSliderShown, setIsSliderShown] = useState(false);

  const currentPlayer = players[currentPlayerIndex];

  const edges: EdgeConfig[] = [
    { pos: { top: "11%" }, dir: "row", len: top },
    { pos: { right: "3%" }, dir: "column", len: right },
    {
      pos: { bottom: "11%" },
      dir: "row",
      len: bottom,
      addStyle: { flexDirection: "row-reverse" },
    },
    {
      pos: { left: "3%" },
      dir: "column",
      len: left,
      addStyle: { flexDirection: "column-reverse" },
    },
  ];

  let globalIndex = 0;

  useEffect(() => {
    if (players.length === 1) {
      endGame();
      return;
    }
    if (startNewGame) {
      startGame();
    }
  }, [players.length, startNewGame]);

  function startGame() {
    if (players.length < 2) {
      console.warn("Za mało graczy do rozpoczęcia gry");
      return;
    }

    const dealerIndex = Math.floor(Math.random() * players.length);
    const smallBlindIndex = (dealerIndex + 1) % players.length;
    const bigBlindIndex = (dealerIndex + 2) % players.length;

    players.forEach((player, i) => {
      player.currentBet = 0;
      player.isDealer = false;
      player.folded = false;
      player.lastAmount = 0;
      player.lastAction = "";

      if (player.name == "") player.name = `Player${i + 1}`;
      player.isDealer = i === dealerIndex;
      if (i === smallBlindIndex) {
        player.take(smallBlindAmount);
        player.setLastAction("SB");
      }
      if (i === bigBlindIndex) {
        player.take(bigBlindAmount);
        player.setLastAction("BB");
      }
    });

    setShownCards(0);
    setPlayers((prevPlayers) =>
      prevPlayers.filter((player) => player.balance > 0)
    );
    setCanRaise(true);
    setBiggestBetPlayerIndex(bigBlindIndex);
    setMinAmount(bigBlindAmount);
    setCurrentPlayerIndex((dealerIndex + 3) % players.length);
    setIsGameStarted(true);
    setIsGameEnded(false);
    setStartNewGame(false);
  }

  function endGame() {
    setCurrentPlayerIndex(-1);
    setIsGameEnded(true);
  }

  function nextPlayer() {
    let newPlayerIndex = (currentPlayerIndex + 1) % players.length;
    while (players[newPlayerIndex]?.folded) {
      if (newPlayerIndex == currentPlayerIndex) {
        endGame();
      } // If looped back to current player, stop game
      newPlayerIndex = (newPlayerIndex + 1) % players.length;
    }
    setCurrentPlayerIndex(newPlayerIndex);
    if (
      players[newPlayerIndex].balance == 0 ||
      players[newPlayerIndex].balance <= minAmount
    )
      setCanRaise(false);
    else setCanRaise(true);
  }

  function call() {
    if (currentPlayerIndex === -1) return; // No current player
    let amountToCall = 0;
    if (currentPlayer.lastAction == "SB")
      amountToCall = minAmount - smallBlindAmount - currentPlayer.currentBet;
    else if (currentPlayer.lastAction == "BB")
      amountToCall = minAmount - bigBlindAmount - currentPlayer.currentBet;
    else amountToCall = minAmount - currentPlayer.currentBet;

    if (amountToCall < 0) amountToCall = 0;

    currentPlayer.take(amountToCall);
    currentPlayer.setLastAction("call");

    if (players.every((p) => p.balance === 0 || p.folded)) setIsGameEnded(true);

    if (currentPlayerIndex == biggestBetPlayerIndex) {
      if (shownCards < 5) {
        showCards();
        players.forEach((p) => (p.lastAction = ""));
        setMinAmount(0);
        setCurrentPlayerIndex(
          (players.findIndex((p) => !p.folded) + 1) % players.length
        );
      } else endGame();
    } else nextPlayer();
  }

  function allIn() {
    if (currentPlayerIndex === -1) return; // No current player
    const allInAmount = currentPlayer.balance;
    const playersNames = players
      .filter((player) => !player.folded)
      .map((player) => player.name);
    if (playersNames.length === 0) return;
    currentPlayer.take(allInAmount);
    currentPlayer.setLastAction("All-in");
    nextPlayer();
  }

  function check() {
    currentPlayer.lastAction = "check";
    const dealerIndex = players.findIndex((player) => player.isDealer);
    if (
      currentPlayerIndex == biggestBetPlayerIndex ||
      currentPlayerIndex == dealerIndex
    ) {
      if (shownCards < 5) {
        showCards();
        players.forEach((p) => (p.lastAction = ""));
        const newPlayerIndex = getNextNonFoldedPlayerIndex(dealerIndex);
        setCurrentPlayerIndex(newPlayerIndex);
        setBiggestBetPlayerIndex(newPlayerIndex - 1);
      } else {
        endGame();
      }
    } else {
      const playersNotFolded = players.filter((player) => !player.folded);
      if (playersNotFolded.every((player) => player.balance == 0))
        revealAllCards();
      nextPlayer();
    }
  }

  function raise(amount: number) {
    currentPlayer.take(amount);
    currentPlayer.setLastAction("raise");

    setMinAmount(amount);
    setBiggestBetPlayerIndex(currentPlayerIndex);
    setIsSliderShown(false);

    if (players.every((player) => player.balance == 0 || player.folded))
      setIsGameEnded(true);
    nextPlayer();
  }

  function fold() {
    let playersLeft = 0;
    currentPlayer.fold();
    players.forEach((player) => (player.folded ? null : playersLeft++));
    currentPlayer.lastAction = "fold";
    if (playersLeft == 1) {
      // If only one player left, they win the pot
      const winner = players.find((player) => !player.folded);
      if (!winner) return;
      const pot = players.reduce((sum, p) => sum + p.currentBet, 0);
      winner.balance += pot;
      endGame();
    } else nextPlayer();
  }

  function getNextNonFoldedPlayerIndex(startIndex: number) {
    let newPlayerIndex = (startIndex + 1) % players.length;
    while (players[newPlayerIndex].folded) {
      newPlayerIndex = (newPlayerIndex + 1) % players.length;
    }
    return newPlayerIndex;
  }

  function revealAllCards() {
    setShownCards(5);
    endGame();
  }

  function showCards() {
    const amount = shownCards == 0 ? 3 : 1;
    setShownCards((prev) => prev + amount);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Svg style={styles.background} viewBox="0 0 600 1200">
            <Rect
              x={0}
              y={0}
              width={600}
              height={1200}
              rx={300}
              ry={180}
              fill="#2E1C1C"
            />
            <Rect
              x={20}
              y={20}
              width={560}
              height={1160}
              rx={280}
              ry={160}
              fill="#4d342f"
            />
            <Rect
              x={40}
              y={40}
              width={520}
              height={1120}
              rx={260}
              ry={140}
              fill="#006400"
            />
            <Rect
              x={150}
              y={200}
              width={300}
              height={800}
              rx={180}
              ry={100}
              fill="none"
              stroke="#005000"
              strokeWidth={12}
            />
          </Svg>
          <View style={[styles.content]}>
            {edges.map(({ pos, dir, len, addStyle }, index) => (
              <View key={index + 1} style={[styles[dir], pos, addStyle]}>
                {
                  Array.from({ length: len }).map((_, j) => {
                    const currentIndex = globalIndex++;
                    const player = players[currentIndex];
                    return (
                      <PlayerButton key={j+1} name={player.name} balance={player.balance} isDealer={player.isDealer} onPress={() => {if (player.name === "") {setShowInput([true, currentIndex])}}}
                        isCurrentPlayer={currentPlayerIndex == currentIndex} disabled={isGameStarted} isGameStarted={isGameStarted} lastAction={player.lastAction} showLastAction={true} opacity={player.folded ? .5 : 1}
                        />
                    )
                })}
              </View>
            ))}
            <View style={styles.potsView}>
              <View style={styles.cards}>
                {Array.from({ length: shownCards }).map((_, index) => (
                  <CardBackView key={index + 1} />
                ))}
              </View>
              <Text style={{ color: "#000", fontSize: 24 }}>
                {players.reduce((sum, player) => sum + player.currentBet, 0)}
              </Text>
            </View>
          </View>
          {!isGameStarted && (
            <TouchableHighlight
              style={[styles.button, { marginBottom: "4%" }]}
              underlayColor="#948870"
              onPress={() => {
                startGame();
                setIsGameStarted(true);
              }}
            >
              <Text style={styles.buttonText}>Start Game</Text>
            </TouchableHighlight>
          )}
          {isGameStarted && (
            <View style={styles.buttonsRow}>
              {currentPlayer &&
              currentPlayer.balance < minAmount &&
              currentPlayer.balance != 0 ? (
                <ActionButton
                  text="All-in"
                  onPress={() => allIn()}
                  addButtonStyle={{ height: 50 }}
                  addTextStyle={{ fontSize: 20 }}
                />
              ) : currentPlayer &&
                currentPlayer.currentBet < minAmount &&
                currentPlayer.balance != 0 ? (
                <ActionButton
                  text="Call"
                  onPress={() => call()}
                  addButtonStyle={{ height: 50 }}
                  addTextStyle={{ fontSize: 20 }}
                />
              ) : (
                <ActionButton
                  text="Check"
                  onPress={() => check()}
                  addButtonStyle={{ height: 50 }}
                  addTextStyle={{ fontSize: 20 }}
                />
              )}
              <ActionButton
                text="Raise"
                onPress={() => setIsSliderShown(true)}
                opacity={canRaise ? 1 : 0.5}
                addTextStyle={{ fontSize: 20 }}
                disabled={!canRaise}
              />
              <ActionButton
                text="Fold"
                onPress={() => fold()}
                addTextStyle={{ fontSize: 20 }}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
      {isSliderShown && (
        <View style={styles.popUp}>
          <CustomSlider
            minimumValue={+minAmount + 1}
            maximumValue={+currentPlayer.balance}
            step={1}
            value={+minAmount + 1}
            onValueChange={setSliderValue}
            onAccept={() => {
              raise(sliderValue);
            }}
            onClose={() => {setIsSliderShown(false)}}
          />
        </View>
      )}
      {isGameEnded && (
        <PotsShowdown
          players={players}
          onClose={() => {
            setPlayers((prev) => prev.filter((player) => player.balance > 0));
            setStartNewGame(true);
          }}
        />
      )}
      {showInput[0] && (
        <Modal
          onRequestClose={() => setShowInput([false, -1])}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.popUp}>
            <View style={[styles.popUpInside, { height: 'auto', paddingVertical: 50 }]}>
              <TouchableHighlight
                style={styles.closeButton}
                underlayColor="transparent"
                onPress={() => setShowInput([false, -1])}
              >
                <Svg viewBox="-1 -1 2 2" width={15} height={15}>
                  <Path
                    d="M -1 -1 L 1 1 M 1 -1 L -1 1"
                    stroke="#fff"
                    strokeWidth={0.2}
                    strokeLinecap="round"
                  />
                </Svg>
              </TouchableHighlight>
              <TextInput
                placeholder="Player name"
                style={styles.input}
                placeholderTextColor="#999"
                onChange={(e) => {
                  const value = e.nativeEvent.text;
                  setInputValue(value);
                }}
              />
              <TouchableHighlight
                style={styles.dodajButton}
                underlayColor="#948870"
                onPress={() => {
                  if (inputValue.trim() !== "") {
                    setPlayers((players) =>
                      players.map((player, index) =>
                        index === showInput[1] ? new Player(inputValue) : player
                      )
                    );
                    setShowInput([false, -1]);
                    setInputValue("");
                  }
                }}
              >
                <Text>Dodaj</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      )}
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
    display: "flex",
  },
  background: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "80%",
    height: "100%",
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
  },
  content: {
    position: "relative",
    flex: 1,
    top: "50%",
    left: "50%",
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
  },
  row: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "65%",
    left: "50%",
    transform: [{ translateX: "-50%" }],
  },
  column: {
    position: "absolute",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    height: "60%",
    top: "50%",
    transform: [{ translateY: "-50%" }],
  },
  bottom: {
    flexDirection: "row-reverse",
  },
  button: {
    minWidth: screenWidth * 0.2,
    maxWidth: screenWidth * 0.35,
    backgroundColor: "#cbbb9c",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    outlineColor: "white",
    outlineWidth: 2,
    padding: 5,
    textAlign: "center",
  },
  buttonView: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    textAlign: "center",
  },
  popUp: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, .7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popUpInside: {
    width: screenWidth * 0.7,
    height: screenWidth * 0.7,
    backgroundColor: "#151515",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    color: "#ccc",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#f00",
    borderWidth: 2,
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: "#222",
    color: "#fff",
  },
  dodajButton: {
    marginTop: 20,
    backgroundColor: "#cbbb9c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonsRow: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    gap: 15,
  },
  blindView: {
    backgroundColor: "#111",
    padding: 2,
    borderRadius: 5,
    minWidth: screenWidth * 0.2,
    maxWidth: screenWidth * 0.35,
  },
  blindText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    textTransform: "capitalize",
  },
  potsView: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  cards: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});

export default PokerGame;
