import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  TextInput,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import Toast from "react-native-toast-message";

import RootStackParamList from "../../props/RootStackParamList";
import BlackjackPlayer from "../../classes/BlackjackPlayer";
import BetInput from "../../components/BetInput";
import toastConfig from "../../config/ToastConfig";
import ActionButton from "../../components/ActionButton";
import PlayerButton from "../../components/PlayerButton";
import { Image } from "react-native-animatable";
import { useLanguage } from "../../hooks/useLanguage";
import AsyncStorage from "@react-native-async-storage/async-storage";

type GameRouteProp = RouteProp<RootStackParamList, "Game">;
type ButtonAction = "hit" | "stand" | "blackjack" | "double" | "insurance" | "busted";
type SkippedAction = "" | "hit" | "stand" | "blackjack" | "double" | "insurance" | "busted";

interface OldBlackjackGameSaveState {
  players: BlackjackPlayer[];
  dealer: BlackjackPlayer;
  currentPlayerIndex: number;
  isGameStarted: boolean;
  didEveryoneBet: boolean;
  showdownVisible: boolean;
  afterInsurance: boolean;
  showInsurance: boolean;
  buttons: ButtonAction[];
  SKIPPED_ACTIONS: SkippedAction[];
  date: number;
}

interface BlackjackGameSaveState {
  players: BlackjackPlayer[];
  date: number;
}

const BlackjackGame = () => {
  const { language } = useLanguage();
  const route = useRoute<GameRouteProp>();
  const navigation = useNavigation<any>();
  const { playersCount, initialBalance, loadGame } = route.params;
  const { width } = useWindowDimensions();

  const dynamicStyles = StyleSheet.create({
    popUpInside: {
      width: width * 0.4,
    },
    playerButtonOverrides: {
      minWidth: width * 0.1,
      maxWidth: width * 0.15,
    },
  });

  const [players, setPlayers] = useState<BlackjackPlayer[]>(
    Array.from(
      { length: playersCount },
      () => new BlackjackPlayer("", initialBalance)
    )
  );
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(-1);
  const currentPlayer = players[currentPlayerIndex];
  const dealer = useRef<BlackjackPlayer>(new BlackjackPlayer("Dealer"));
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [showInput, setShowInput] = useState([false, -1]);
  const [inputValue, setInputValue] = useState("");

  const [didEveryoneBet, setDidEveryoneBet] = useState(false);
  // tego nie tlumacz tych guzikow
  const [buttons, setButtons] = useState<ButtonAction[]>(["hit", "stand", "blackjack", "double", "insurance"]);
  const [showdownVisible, setShowdownVisible] = useState(false);
  const [afterInsurance, setAfterInsurance] = useState(false);
  const [showInsurance, setShowInsurance] = useState(false);
  const [showGameEnded, setShowGameEnded] = useState(false);

  const [SKIPPED_ACTIONS, setSKIPPED_ACTIONS] = useState<SkippedAction[]>(['blackjack', 'busted']);
  const [didDealerHaveBlackjack, setDidDealerHaveBlackjack] = useState(false);

  const stateToSaveRef = useRef<BlackjackGameSaveState>({
    players,
    date: Date.now()
  });

  // useEffect(() => {
  //   stateToSaveRef.current = {
  //     players,
  //     date: Date.now()
  //   };
  // }, [players])

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    if(loadGame)
      loadLastGame();

    const saveGame = async () => {
      if(isGameStarted && players.find(p => p.name === '')) return;
      await AsyncStorage.setItem("@lastBlackjackGameSave", JSON.stringify(stateToSaveRef.current));
    }
    return () => {
      // saveGame();
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const loadLastGame = async () => {
    const lastGame = await AsyncStorage.getItem("@lastBlackjackGameSave");
    if(lastGame) {
      try {
        const lastGameInfo: BlackjackGameSaveState = JSON.parse(lastGame);

        const rehydratedPlayers = lastGameInfo.players.map(playerObject => 
          BlackjackPlayer.fromPlainObject(playerObject)
        );
        // const rehydratedDealer = BlackjackPlayer.fromPlainObject(lastGameInfo.dealer)

        setPlayers(rehydratedPlayers);
        // dealer.current = rehydratedDealer;
        // setCurrentPlayerIndex(lastGameInfo.currentPlayerIndex);
        // setIsGameStarted(lastGameInfo.isGameStarted);
        // setDidEveryoneBet(lastGameInfo.didEveryoneBet);
        // setShowdownVisible(lastGameInfo.showdownVisible);
        // setAfterInsurance(lastGameInfo.afterInsurance);
        // setShowInsurance(lastGameInfo.showInsurance);
        // setButtons(lastGameInfo.buttons);
        // setSKIPPED_ACTIONS(lastGameInfo.SKIPPED_ACTIONS);
      }
      catch(err) {
        console.error(err)
      }
    }
  };

  function resetButtons() {
    setButtons(["hit", "stand", "blackjack", "double", "insurance"]);
  }

  function startGame() {
    const updatedPlayers = players.map((player, i) => {
      player.currentBet = 0;
      player.isDealer = false;
      player.cardsCount = 0;
      player.lastAction = "";
      if (player.name === "") player.name = `Player ${i + 1}`;
      return player;
    });
    dealer.current.cardsCount = 2;
    setPlayers(updatedPlayers);
    setCurrentPlayerIndex(0);
    setDidEveryoneBet(false);
    setIsGameStarted(true);
    setAfterInsurance(false);
  }

  function endGame() {
    const insurancePlayerIndex = players.findIndex(
      (player) => player.lastAction == "insurance"
    );

    if (insurancePlayerIndex != -1) {
      setShowInsurance(true);
      resetButtons();
      return;
    }

    let firstPlayerIndex = 0;
    while(players[firstPlayerIndex].lastAction && SKIPPED_ACTIONS.includes(players[firstPlayerIndex].lastAction)) {
      firstPlayerIndex++;
      if (firstPlayerIndex == players.length) {
        setIsGameStarted(false);
        return;
      }
    }
    setCurrentPlayerIndex(firstPlayerIndex);
    setShowdownVisible(true);
    setIsGameStarted(false);
  }

  const findNextActivePlayer = (startIndex: number): number => {
    // Defines which players are OUT of the current action round
    let nextIndex = startIndex === -1 ? 0 : (startIndex + 1);

    for (let _ in players) {
        if (nextIndex >= players.length) {
          nextIndex = 0; // Wrap around to the start
        }

        const player = players[nextIndex];
        if (!SKIPPED_ACTIONS.includes(player.lastAction) && player.currentBet != 0) {
          console.log(SKIPPED_ACTIONS, player.lastAction, player.currentBet);
          return nextIndex;
        }
        
        nextIndex++; // Check the next one
    }

    return -1; 
  };

  function nextPlayer() {
    resetButtons();
    let newIndex = (currentPlayerIndex + 1) % players.length;
    console.log(afterInsurance)
    console.log(players.find(p => p.lastAction == 'insurance'))
    if(afterInsurance && players.find(p => p.lastAction == 'insurance') && !showdownVisible) {
      console.log(1)
      newIndex = players.findIndex(p => p.lastAction == 'insurance');
      console.log(newIndex)
      setCurrentPlayerIndex(newIndex);
      return;
    }
    if(afterInsurance && !showdownVisible) {
      setCurrentPlayerIndex(0);
      setAfterInsurance(false);
      setShowdownVisible(true);
      return;
    }
    if (showdownVisible) {
      console.log('---------------')
      console.log(players[newIndex].lastAction)

      if (newIndex == 0 || newIndex == -1) {
        setShowdownVisible(false);
        setShowGameEnded(true);
        return;
      }
      
      newIndex = findNextActivePlayer(newIndex-1);
      console.log(newIndex)
      
      if (newIndex == -1) {
        setShowdownVisible(false);
        setShowGameEnded(true);
        return;
      }
    }

    if (newIndex != 0) {
      setCurrentPlayerIndex(newIndex);
      return;
    }

    if (didEveryoneBet) {
      let newIndex = 0;
      while (SKIPPED_ACTIONS.includes(players[newIndex].lastAction)) {
        newIndex++;
        if (newIndex == players.length) {
          setShowGameEnded(true);
          return;
        }
      }
      setCurrentPlayerIndex(newIndex);
      endGame();
      return;
    }
    setDidEveryoneBet(true);
    setCurrentPlayerIndex(newIndex);
  }

  function hit() {
    if (currentPlayer.cardsCount >= 9) return;
    currentPlayer.lastAction = "hit";
    currentPlayer.cardsCount++;
    setButtons(["hit", "stand", "busted"]);
  }

  function stand() {
    currentPlayer.lastAction = "stand";
    nextPlayer();
  }

  function blackjack() {
    currentPlayer.lastAction = "blackjack";
    currentPlayer.give(currentPlayer.currentBet + currentPlayer.currentBet * 1.5);
    nextPlayer();
  }

  function double() {
    currentPlayer.lastAction = "double";
    currentPlayer.take(currentPlayer.currentBet);
    currentPlayer.cardsCount++;
    nextPlayer();
  }

  function insurance() {
    currentPlayer.lastAction = "insurance";
    currentPlayer.take(currentPlayer.currentBet / 2);
    nextPlayer();
  }

  function busted() {
    currentPlayer.lastAction = "busted";
    resetButtons();
    nextPlayer();
  }

  const firstAndLastPlayer = [players[0], players[players.length - 1]];

  return (
    <SafeAreaProvider>
      <View style={styles.secondPlane}>
        <Image
          source={require("../../assets/dealer/dealer.png")}
          style={styles.dealer}
        />
      </View>
      <View style={styles.table}>
        <View style={styles.playersContainer}>
          {players.map((player, index) => {
            const isFirst = index == 0;
            const isLast = index == players.length - 1;
            if (isFirst || isLast) return;
            return (
              <PlayerButton key={index+1} isCurrentPlayer={player === currentPlayer} onPress={() => setShowInput([true, index])} name={player.name} balance={player.balance}
                cardsCount={player.cardsCount} disabled={isGameStarted} opacity={[...SKIPPED_ACTIONS, 'busted', 'blackjack'].includes(player.lastAction) ? .5 : 1} isGameStarted={isGameStarted}
                addStyles={dynamicStyles.playerButtonOverrides} />
            );
          })}
        </View>
        <View
          style={[
            styles.playersContainer,
            { paddingHorizontal: 0, justifyContent: "space-between" },
          ]}
        >
          {firstAndLastPlayer.map((player, index) => {
            const isFirst = index == 0;
            const rightIndex = isFirst ? 0 : players.length-1;
            const rightLeft = isFirst ? { left: "2%" } : { right: "2%" };
            const addPositionStyles = [
              rightLeft,
              {
                position: "fixed",
                bottom: "50%",
              },
            ];
            return (
              <PlayerButton key={index+1} isGameStarted={isGameStarted} isCurrentPlayer={player === currentPlayer} onPress={() => setShowInput([true, rightIndex])} 
                name={player.name} balance={player.balance} cardsCount={player.cardsCount} disabled={isGameStarted} addPositionStyles={addPositionStyles} 
                opacity={[...SKIPPED_ACTIONS, 'busted', 'blackjack'].includes(player.lastAction) ? .5 : 1} addStyles={dynamicStyles.playerButtonOverrides} />
            );
          })}
        </View>
        
        
        {!isGameStarted && 
          <TouchableHighlight style={[styles.button, { position: 'absolute', bottom: '30%' }]} underlayColor="#948870" onPress={startGame}>
            <Text style={styles.buttonText}>{language === "pl" ? "Rozpocznij Grę" : "Start Game"}</Text>
          </TouchableHighlight>
        }
        {(isGameStarted && currentPlayer && !didEveryoneBet) && (
          <View style={[styles.row, {bottom: '25%'}]}>
            <BetInput min={5} max={currentPlayer.balance} onConfirm={(amount) => {
              if (dealer.current.balance < amount * 2.5) {
                Toast.show({ type: "error", text1: language === "pl" ? "Dealer nie może pokryć tego zakładu 💸" : "Dealer can't cover this bet 💸", text2: language === "pl" ? "Zmniejsz stawkę!" : "Lower your stake or let them recover!" });
                return;
              }
              if (dealer.current.balance <= 0) {
                endGame();
                Toast.show({ type: "success", text1: language === "pl" ? "" : "Ograłeś krupiera! 🎉", text2: language === "pl" ? "Dom nie ma już żetonów" : "No more chips in the house." });
                return;
              }
              currentPlayer.take(amount);
              currentPlayer.currentBet = amount;
              dealer.current.give(amount);
              if(currentPlayerIndex == players.length-1)
                players.forEach(p => p.cardsCount = 2);
              nextPlayer();
            }}/>
          </View>
        )}
        {(!showInsurance && !showGameEnded && !showdownVisible && isGameStarted && currentPlayer && didEveryoneBet) && (
          <View style={[styles.row, {bottom: '40%', maxWidth: '70%'}]}>
            {buttons.includes("hit") && <ActionButton text={language === "pl" ? "Dobranie" : "Hit"} onPress={hit} />}
            {buttons.includes("stand") && <ActionButton text={language === "pl" ? "Pas" : "Stand"} onPress={stand} />}
            {buttons.includes("double") && <ActionButton text={language === "pl" ? "Podwojenie" : "Double"} onPress={double} />}
            {buttons.includes("busted") && <ActionButton text={language === "pl" ? "Przegrana" : "Busted"} onPress={busted} />}
            {(buttons.includes("insurance") && !afterInsurance) && <ActionButton text={language === "pl" ? "Ubezpieczenie" : "Insurance"} onPress={insurance} />}
            {buttons.includes("blackjack") && <ActionButton text="Blackjack" onPress={blackjack} />}
          </View>
        )}
        {showInsurance && (
          <View style={[styles.row, {bottom: '40%', maxWidth: '70%', flexWrap: "wrap"}]}>
            <Text style={{color: '#fff'}}>{language === "pl" ? "Czy Dealer ma blackjacka?" : "Does Dealer have blackjack?"}</Text>
            <View style={{ flexDirection: 'row', gap: 15 }}>
              <ActionButton text={language === "pl" ? "Tak" : "Yes"} onPress={() => { players.forEach(p => {if(p.lastAction == 'insurance') p.give(p.currentBet)});
                setShowInsurance(false); setAfterInsurance(true); const newSkippedActions: SkippedAction[] = ["insurance", "blackjack", "busted", "hit"]; setSKIPPED_ACTIONS(newSkippedActions);
                const firstNotInsurancePlayerIndex = players.findIndex(p => ['double', 'stand'].includes(p.lastAction)); setDidDealerHaveBlackjack(true);
                if(firstNotInsurancePlayerIndex !== -1) { setShowdownVisible(true); setCurrentPlayerIndex(firstNotInsurancePlayerIndex); }}} />
              <ActionButton text={language === "pl" ? "Nie" : "No"} onPress={() => {players.forEach(p => {if(p.lastAction == 'insurance') {p.currentBet *= 2/3}}); setShowInsurance(false); 
                const firstInsurancePlayerIndex = players.findIndex(p => p.lastAction == 'insurance'); if (firstInsurancePlayerIndex === -1) { setShowGameEnded(true); return; }
                setCurrentPlayerIndex(firstInsurancePlayerIndex); setSKIPPED_ACTIONS(["hit", "blackjack", "busted"]); setAfterInsurance(true); resetButtons();}} />
            </View>
          </View>
        )}
        {showGameEnded && (
          <View style={[styles.row, {bottom: '40%', maxWidth: '70%', flexDirection: 'column'}]}>
            <Text style={{ fontSize: 22, color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>{language === "pl" ? "Koniec Rundy" : "Round Over"}</Text>
            <View style={{flexDirection: 'row', gap: 10}}>
              <ActionButton text={language === "pl" ? "Nowa Gra" : "New Game"} onPress={() => {setShowGameEnded(false); startGame(); AsyncStorage.setItem('@lastBlackjackGameSave', JSON.stringify({players, date: Date.now()}))}} />
              <ActionButton text={language === "pl" ? "Przestań Grać" : "Stop Playing"} onPress={() => {setShowGameEnded(false); ScreenOrientation.unlockAsync(); navigation.navigate("MainTabs"); AsyncStorage.setItem('@lastBlackjackGameSave', JSON.stringify({players, date: Date.now()}))}} />
            </View>
          </View>
        )}
        {showdownVisible && (
          <View style={[styles.row, {bottom: '40%', maxWidth: '70%', flexWrap: "wrap"}]}>
            <View>
              <Text style={{ fontSize: 18, color: "#fff" }}>
                {currentPlayer.name ?? ""}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 15 }}>
              {!didDealerHaveBlackjack && 
                <TouchableHighlight style={styles.dodajButton} underlayColor="#948870" onPress={() => {currentPlayer.give(currentPlayer.currentBet * 2); nextPlayer();}}>
                  <Text style={styles.buttonText}>{language === "pl" ? "Wygrana" : "Won"}</Text>
                </TouchableHighlight>
              }
              <TouchableHighlight style={styles.dodajButton} underlayColor="#948870" onPress={() => {nextPlayer();}}>
                <Text style={styles.buttonText}>{language === "pl" ? "Przegrana" : "Lost"}</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.dodajButton} underlayColor="#948870" onPress={() => {currentPlayer.give(currentPlayer.currentBet); nextPlayer();}}>
                <Text style={styles.buttonText}>{language === "pl" ? "Remis" : "Push"}</Text>
              </TouchableHighlight>
            </View>
          </View>
        )}
      </View>
      {showInput[0] && (
        <Modal onRequestClose={() => setShowInput([false, -1])} transparent={true} animationType="fade" statusBarTranslucent={true}>
          <Pressable style={styles.popUp} onPress={() => setShowInput([false, -1])}>
            <TouchableWithoutFeedback>
              <View style={[styles.popUpInside, dynamicStyles.popUpInside]}>
                <TouchableHighlight style={styles.closeButton} underlayColor="transparent" onPress={() => setShowInput([false, -1])}>
                  <Text style={[styles.buttonText, { fontSize: 24, color: "#fff" }]}>×</Text>
                </TouchableHighlight>
                <Text style={{ marginBottom: 15, fontSize: 18, color: '#fff' }}>{language === "pl" ? "Edytuj Nazwę Gracza" : "Edit Player Name"}</Text>
                <TextInput
                  placeholder="Player Name"
                  style={styles.input}
                  placeholderTextColor="#999"
                  onChangeText={setInputValue}
                />
                <TouchableHighlight style={styles.dodajButton} underlayColor="#948870" 
                  onPress={() => {
                    if (inputValue.trim() !== "") {
                      setPlayers((currentPlayers) =>
                        currentPlayers.map((player, index) =>
                          index === showInput[1]
                            ? new BlackjackPlayer(inputValue)
                            : player
                        )
                      );
                      setShowInput([false, -1]);
                      setInputValue("");
                    }
                  }}>
                  <Text style={styles.buttonText}>{language === "pl" ? "Zapisz" : "Save"}</Text>
                </TouchableHighlight>
              </View>
            </TouchableWithoutFeedback>
          </Pressable>
        </Modal>
      )}
      <Toast config={toastConfig} swipeable />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0e0e0e",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  table: {
    backgroundColor: "green",
    width: "100%",
    alignSelf: "center",
    height: "65%",
    // alignSelf: "flex-end",
    top: "35%",
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
    top: 0,
    left: 0,
    backgroundColor: "transparent",
    // alignSelf: "flex-end",
    alignItems: "flex-start",
    zIndex: 2,
  },
  dealer: {
    width: "50%",
    height: "105%",
    resizeMode: "contain",
    alignSelf: "center",
    // position: "absolute",
    zIndex: 5,
    bottom: 0,
    left: 0,
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  playersContainer: {
    position: "absolute",
    bottom: "2%",
    width: "100%",
    height: "75%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingHorizontal: 10,
  },
  column: {
    justifyContent: "flex-start",
    gap: 30,
    paddingBottom: 5,
  },
  button: {
    backgroundColor: "#cbbb9c",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 8,
    outlineWidth: 2,
    outlineColor: "white",
  },
  currentPlayerHighlight: {
    outlineColor: "#0066ff",
    outlineWidth: 3.5,
    transform: [{ scale: 1.1 }],
    elevation: 10,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    width: "90%",
    left: "50%",
    transform: [{ translateX: "-50%" }],
    flexWrap: "wrap",
  },
  popUp: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
  },
  popUpInside: {
    maxWidth: 400,
    padding: 25,
    backgroundColor: "#212121",
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#424242",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 15,
  },
  input: {
    width: "100%",
    height: 45,
    borderColor: "#616161",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#333",
    color: "#fff",
    fontSize: 16,
  },
  dodajButton: {
    marginTop: 20,
    backgroundColor: "#1e88e5",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  dealerButton: {
    position: "absolute",
    backgroundColor: "#1a237e",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#5c6bc0",
  },
  actionButton: {
    backgroundColor: "#cbbb9c",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginVertical: 6,
  },
  actionButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  absoluteCenter: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
  },
});

export default BlackjackGame;
