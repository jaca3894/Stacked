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
import * as ScreenOrientation from 'expo-screen-orientation';
import Toast from "react-native-toast-message";

import RootStackParamList from "../../props/RootStackParamList";
import BlackjackPlayer from "../../classes/BlackjackPlayer";
import BetInput from "../../components/BetInput";
import toastConfig from "../../config/ToastConfig";
import ActionButton from "../../components/ActionButton";
import PlayerButton from "../../components/PlayerButton";
import { Image } from "react-native-animatable";

type GameRouteProp = RouteProp<RootStackParamList, "Game">;

const BlackjackGame = () => {
  const route = useRoute<GameRouteProp>();
  const navigation = useNavigation<any>();
  const { playersCount, initialBalance } = route.params;
  const { width } = useWindowDimensions();

  const dynamicStyles = StyleSheet.create({
    popUpInside: {
      width: width * 0.4,
    },
    playerButtonOverrides: {
      minWidth: width * 0.1,
      maxWidth: width * 0.15,
    }
  });

  const [players, setPlayers] = useState<BlackjackPlayer[]>(
    Array.from({ length: playersCount }, () => new BlackjackPlayer("", initialBalance))
  );
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(-1);
  const currentPlayer = players[currentPlayerIndex];
  const dealer = useRef<BlackjackPlayer>(new BlackjackPlayer('Dealer'));
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [showInput, setShowInput] = useState([false, -1]);
  const [inputValue, setInputValue] = useState("");

  const [didEveryoneBet, setDidEveryoneBet] = useState(false);
  const [buttons, setButtons] = useState(["hit", "stand", "blackjack", "double", "insurance"]);
  const [showdownVisible, setShowdownVisible] = useState(false);
  const [showInsurance, setShowInsurance] = useState(false);
  const [showGameEnded, setShowGameEnded] = useState(false);

  const SKIPPED_ACTIONS = ['blackjack', 'busted', 'surrendered'];

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  function resetButtons() {
    setButtons(["hit", "stand", "blackjack", "double", "insurance"]);
  }

  function startGame() {
    const updatedPlayers = players.map((player, i) => {
      player.currentBet = 0;
      player.isDealer = false;
      player.cardsCount = 0;
      if (player.name === "") player.name = `Player ${i + 1}`;
      return player;
    });
    dealer.current.cardsCount = 2;
    setPlayers(updatedPlayers);
    setCurrentPlayerIndex(0);
    setDidEveryoneBet(false);
    setIsGameStarted(true);
  }
  
  function endGame() {
    const insurancePlayerIndex = players.findIndex(player => player.lastAction == 'insurance');

    console.log('Insurance Index' + insurancePlayerIndex)
    if(insurancePlayerIndex != -1) {
      setShowInsurance(true);
      resetButtons();
      return;
    }

    let firstPlayerIndex = 0;
    while(SKIPPED_ACTIONS.includes(players[firstPlayerIndex].lastAction)) {
      firstPlayerIndex++;
      console.log('New First Player Index' + firstPlayerIndex);
      if(firstPlayerIndex == players.length) {
        setIsGameStarted(false);
        setCurrentPlayerIndex(-1);
        return;
      }
    }
    console.log('Final First Player Index' + firstPlayerIndex);
    setCurrentPlayerIndex(firstPlayerIndex);
    setShowdownVisible(true);
    setIsGameStarted(false);
  }

  function nextPlayer() {
    resetButtons();
    let newIndex = (currentPlayerIndex + 1) % players.length
    if(showdownVisible) {
      if(newIndex == 0) {
        setShowdownVisible(false);
        setShowGameEnded(true);
        return;
      }

      while(SKIPPED_ACTIONS.includes(players[newIndex].lastAction)) {
        newIndex++;
        if(newIndex == players.length) {
          setShowdownVisible(false);
          setShowGameEnded(true);
          return;
        }
      }
    }

    if(newIndex == 0) {
      if(didEveryoneBet) {
        let newIndex = 0;
        while(SKIPPED_ACTIONS.includes(players[newIndex].lastAction)) {
          newIndex++;
          if(newIndex == players.length)
            return;
        }
        setCurrentPlayerIndex(newIndex);
        endGame();
        return;
      }
      setDidEveryoneBet(true);
    }

    setCurrentPlayerIndex(newIndex);
  }

  function hit() {
    if(currentPlayer.cardsCount >= 9) 
      return;
    currentPlayer.lastAction = "hit";
    currentPlayer.cardsCount++;
    setButtons(['hit', 'stand', 'busted']);
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
    currentPlayer.lastAction = 'insurance';
    currentPlayer.take(currentPlayer.currentBet/2);
    nextPlayer();
  }

  function busted() {
    currentPlayer.lastAction = "busted";
    resetButtons();
    nextPlayer();
  }

  const firstAndLastPlayer = [players[0], players[players.length-1]];

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
            const isLast = index == players.length-1;
            let addStyles = { backgroundColor: '#121212' };
            if(isFirst || isLast)
              return;
            return (
              <PlayerButton key={index+1} isGameStarted={isGameStarted} isCurrentPlayer={player === currentPlayer} onPress={() => setShowInput([true, index])} 
                name={player.name} balance={player.balance} cardsCount={player.cardsCount} addStyles={[dynamicStyles.playerButtonOverrides, addStyles]} />
            );
          })}
        </View>
        <View style={[styles.playersContainer, { paddingHorizontal: 0, justifyContent: 'space-between', }]}>
          {firstAndLastPlayer.map((player, index) => {
            const isFirst = index == 0;
            const rightLeft = isFirst ? { left: '2%' } : { right: '2%' }
            const addPositionStyles = [rightLeft, {
              position: 'fixed',
              bottom: '50%',
            }];
            return (
              <PlayerButton key={index+1} isGameStarted={isGameStarted} isCurrentPlayer={player === currentPlayer} onPress={() => setShowInput([true, index])} 
                name={player.name} balance={player.balance} cardsCount={player.cardsCount} addPositionStyles={addPositionStyles} addStyles={dynamicStyles.playerButtonOverrides} />
            );
          })}
        </View>
        
        
        {!isGameStarted && 
          <TouchableHighlight style={[styles.button, { position: 'absolute', bottom: '30%' }]} underlayColor="#948870" onPress={startGame}>
            <Text style={styles.buttonText}>Start Game</Text>
          </TouchableHighlight>
        }
        {(isGameStarted && currentPlayer && !didEveryoneBet) && (
          <View style={[styles.row, {bottom: '25%'}]}>
            <BetInput min={5} max={currentPlayer.balance} onConfirm={(amount) => {
              if (dealer.current.balance < amount * 2.5) {
                Toast.show({ type: "error", text1: "Dealer can't cover this bet 💸", text2: "Lower your stake or let them recover!" });
                return;
              }
              if (dealer.current.balance <= 0) {
                endGame();
                Toast.show({ type: "success", text1: "You've cleaned out the dealer! 🎉", text2: "No more chips in the house." });
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
        {(isGameStarted && currentPlayer && didEveryoneBet) && (
          <View style={[styles.row, {bottom: '40%', width: '30%', flexWrap: "wrap"}]}>
            {buttons.includes("hit") && <ActionButton text="Hit" onPress={hit} />}
            {buttons.includes("stand") && <ActionButton text="Stand" onPress={stand} />}
            {buttons.includes("double") && <ActionButton text="Double" onPress={double} />}
            {buttons.includes("busted") && <ActionButton text="Busted" onPress={busted} />}
            {buttons.includes("insurance") && <ActionButton text="Insurance" onPress={insurance} />}
            {buttons.includes("blackjack") && <ActionButton text="Blackjack" onPress={blackjack} />}
          </View>
        )}

        {showInput[0] && (
          <Modal onRequestClose={() => setShowInput([false, -1])} transparent={true} animationType="fade">
            <Pressable style={styles.popUp} onPress={() => setShowInput([false, -1])}>
              <TouchableWithoutFeedback>
                <View style={[styles.popUpInside, dynamicStyles.popUpInside]}>
                  <TouchableHighlight style={styles.closeButton} underlayColor="transparent" onPress={() => setShowInput([false, -1])}>
                    <Text style={[styles.buttonText, {fontSize: 24, color: '#fff'}]}>×</Text>
                  </TouchableHighlight>

                  <Text style={{ marginBottom: 15, fontSize: 18, color: '#fff' }}>Edit Player Name</Text>
                  <TextInput
                    placeholder="Player Name"
                    style={styles.input}
                    placeholderTextColor="#999"
                    onChangeText={setInputValue}
                  />
                  <TouchableHighlight style={styles.dodajButton} underlayColor="#948870"
                    onPress={() => {
                      if (inputValue.trim() !== "") {
                          setPlayers(currentPlayers => currentPlayers.map((player, index) =>
                            index === showInput[1] ? new BlackjackPlayer(inputValue) : player
                          ));
                          setShowInput([false, -1]);
                          setInputValue("");
                      }
                    }}>
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableHighlight>
                </View>
              </TouchableWithoutFeedback>
            </Pressable>
          </Modal>
        )}

        {showdownVisible && (
          <Modal transparent={true} animationType="fade">
            <Pressable style={styles.popUp}>
              <TouchableWithoutFeedback>
                <View style={[styles.popUpInside, dynamicStyles.popUpInside]}>
                  <TouchableHighlight style={styles.dodajButton} underlayColor="#948870" onPress={() => {currentPlayer.give(currentPlayer.currentBet * 2); nextPlayer();}}>
                    <Text style={styles.buttonText}>Win</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.dodajButton} underlayColor="#948870" onPress={() => {nextPlayer();}}>
                    <Text style={styles.buttonText}>Lost</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.dodajButton} underlayColor="#948870" onPress={() => {currentPlayer.give(currentPlayer.currentBet); nextPlayer();}}>
                    <Text style={styles.buttonText}>Push</Text>
                  </TouchableHighlight>
                </View>
              </TouchableWithoutFeedback>
            </Pressable>
          </Modal>
        )}

        {showInsurance && (
          <Modal onRequestClose={() => setShowInsurance(false)} transparent={true} animationType="fade">
            <Pressable style={styles.popUp} onPress={() => setShowInsurance(false)}>
              <TouchableWithoutFeedback>
                <View style={[styles.popUpInside, dynamicStyles.popUpInside]}>
                  <Text>Does Dealer have blackjack</Text>
                  <TouchableHighlight style={styles.dodajButton} underlayColor="#948870" onPress={() => {
                    players.forEach(p => {if(p.lastAction == 'insurance') { p.give(p.currentBet); p.lastAction = '' }});
                    setShowInsurance(false);
                    if(players.find(p => ['double', 'stand'].includes(p.lastAction)))
                      setShowdownVisible(true);
                  }}>
                    <Text style={styles.buttonText}>Yes</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.dodajButton} underlayColor="#948870" onPress={() => {setShowInsurance(false); resetButtons();}}>
                    <Text style={styles.buttonText}>No</Text>
                  </TouchableHighlight>
                </View>
              </TouchableWithoutFeedback>
            </Pressable>
          </Modal>
        )}

        {showGameEnded && (
          <Modal onRequestClose={() => {setShowGameEnded(false); startGame();}} transparent={true} animationType="fade">
            <Pressable style={styles.popUp} onPress={() => {setShowGameEnded(false); startGame();}}>
              <TouchableWithoutFeedback>
                <View style={[styles.popUpInside, dynamicStyles.popUpInside]}>
                  <Text style={{ marginBottom: 20, fontSize: 22, color: '#fff', fontWeight: 'bold' }}>Round Over</Text>
                  <TouchableHighlight style={styles.dodajButton} underlayColor="#948870" onPress={() => {setShowGameEnded(false); startGame();}}>
                    <Text style={styles.buttonText}>New Game</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.dodajButton} underlayColor="#948870" onPress={() => {setShowGameEnded(false); ScreenOrientation.unlockAsync(); navigation.navigate("MainTabs");}}>
                    <Text style={styles.buttonText}>Stop Playing</Text>
                  </TouchableHighlight>
                </View>
              </TouchableWithoutFeedback>
            </Pressable>
          </Modal>
        )}
      </View>
      <Toast config={toastConfig} swipeable />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0e0e0e',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    alignSelf: 'center',
    // position: "absolute",
    zIndex: 5,
    bottom: 0,
    left: 0,
  },
  background: {
    position: "absolute",
    width: '100%',
    height: '100%',
  },
  playersContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '75%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingHorizontal: 10
  },
  column: {
    justifyContent: 'flex-start',
    gap: 30,
    paddingBottom: 5
  },
  button: {
    backgroundColor: '#cbbb9c',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 8,
    outlineWidth: 2,
    outlineColor: 'white',
  },
  currentPlayerHighlight: {
    outlineColor: '#0066ff',
    outlineWidth: 3.5,
    transform: [{ scale: 1.1 }],
    elevation: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  row: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    width: '90%',
    left: '50%',
    transform: [{translateX: '-50%'}]
  },
  popUp: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popUpInside: {
    maxWidth: 400,
    padding: 25,
    backgroundColor: "#212121",
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#424242',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#616161',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#333',
    color: '#fff',
    fontSize: 16,
  },
  dodajButton: {
    marginTop: 20,
    backgroundColor: '#1e88e5',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  dealerButton: {
    position: 'absolute',
    backgroundColor: '#1a237e',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#5c6bc0',
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
});

export default BlackjackGame;