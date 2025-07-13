import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  TextInput,
  Modal,
  Pressable, // For modal
  TouchableWithoutFeedback,  // For modal
  useWindowDimensions,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import * as ScreenOrientation from 'expo-screen-orientation';
import {Svg, Rect } from "react-native-svg";
import Toast from "react-native-toast-message";

import RootStackParamList from "../../props/RootStackParamList";
import BlackjackPlayer from "../../classes/BlackjackPlayer";
import BetInput from "../../components/BetInput";
import toastConfig from "../../config/ToastConfig";
import RoundButton from "../../components/RoundButton";
import PlayerButton from "../../components/PlayerButton";

type GameRouteProp = RouteProp<RootStackParamList, "Game">;

const BlackjackGame = () => {
  const route = useRoute<GameRouteProp>();
  const navigation = useNavigation<any>();
  const { playersCount } = route.params;
  const { width, height } = useWindowDimensions();

  const dynamicStyles = StyleSheet.create({
    playersContainer: {
      paddingHorizontal: width * 0.1,
    },
    column: {
      paddingBottom: height * 0.1,
    },
    popUpInside: {
      width: width * 0.4,
    },
    dealerButton: {
      top: height * 0.05,
    },
    // We can also move the player button styling here to keep it clean
    playerButtonOverrides: {
      minWidth: width * 0.1,
      maxWidth: width * 0.15,
    }
  });

  const [players, setPlayers] = useState<BlackjackPlayer[]>(
    Array.from({ length: playersCount }, () => new BlackjackPlayer())
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

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const splitIndex = Math.ceil(players.length / 2);
  const firstColumnPlayers = players.slice(0, splitIndex);
  const secondColumnPlayers = players.slice(splitIndex);

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

    console.log(insurancePlayerIndex)
    if(insurancePlayerIndex != -1) {
      setShowInsurance(true);
      resetButtons();
      return;
    }

    let firstPlayerIndex = 0;
    while(players[firstPlayerIndex].lastAction == 'blackjack') {
      firstPlayerIndex ++;
      if(firstPlayerIndex == players.length) {
        setIsGameStarted(false);
        setCurrentPlayerIndex(-1);
        return;
      }
    }
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

      while(['blackjack', 'busted'].includes(players[newIndex].lastAction)) {
        newIndex++;
        if(newIndex == players.length) {
          setShowdownVisible(false);
          setShowGameEnded(true);
          return;
        }
      }
    }

    if(newIndex == 0) {
      if(didEveryoneBet)
        endGame();
      setDidEveryoneBet(true);
    }

    setCurrentPlayerIndex(newIndex);
  }

  function hit() {
    console.log('Hit')
    currentPlayer.lastAction = "hit";
    currentPlayer.cardsCount++;
    setButtons(['hit', 'stand', 'busted']);
  }
  
  function stand() {
    console.log('Stand')
    currentPlayer.lastAction = "stand";
    nextPlayer();
  }
  
  function blackjack() {
    console.log('Blackjack')
    currentPlayer.lastAction = "blackjack";
    currentPlayer.give(currentPlayer.currentBet + currentPlayer.currentBet * 1.5);
    nextPlayer();
  }
  
  function double() {
    console.log('Double')
    currentPlayer.lastAction = "double";
    currentPlayer.take(currentPlayer.currentBet);
    currentPlayer.cardsCount++;
    nextPlayer();
  }

  function insurance() {
    console.log('Insurance')
    currentPlayer.lastAction = 'insurance';
    currentPlayer.take(currentPlayer.currentBet/2);
    nextPlayer();
  }

  function busted() {
    console.log('Busted');
    currentPlayer.lastAction = "busted";
    resetButtons();
    nextPlayer();
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Svg style={styles.background} viewBox="0 0 1200 600">
            <Rect x={0} y={0} width={1200} height={600} rx={180} ry={300} fill="#2E1C1C" />
            <Rect x={20} y={20} width={1160} height={560} rx={160} ry={280} fill="#4d342f" />
            <Rect x={40} y={40} width={1120} height={520} rx={140} ry={260} fill="#006400" />
            <Rect x={200} y={150} width={800} height={300} rx={100} ry={180} fill="none" stroke="#005000" strokeWidth={12} />
          </Svg>

          <View style={[styles.dealerButton, dynamicStyles.dealerButton]}>
            <Text style={[styles.buttonText, {color: '#fff'}]} numberOfLines={1} ellipsizeMode="tail">{dealer.current.name}</Text>
          </View>

          <View style={[styles.playersContainer, dynamicStyles.playersContainer]}>
            <View style={[styles.column, dynamicStyles.column, { flexDirection: 'column-reverse', alignItems: 'flex-start'}]}>
              {firstColumnPlayers.map((player, index) => (
                <PlayerButton key={index+1} isGameStarted={isGameStarted} isCurrentPlayer={player === currentPlayer} onPress={() => setShowInput([true, index])} name={player.name} 
                balance={player.balance} cardsCount={player.cardsCount} opacity={player.lastAction == 'busted' ? .6 : 1}  addStyles={dynamicStyles.playerButtonOverrides} />
              ))}
            </View>

            <View style={[styles.column, dynamicStyles.column, { flexDirection: 'column', alignItems: 'flex-start'}]}>
              {secondColumnPlayers.map((player, index) => {
                const originalIndex = index + splitIndex;
                return (
                  <PlayerButton key={originalIndex+1} isGameStarted={isGameStarted} isCurrentPlayer={player === currentPlayer} onPress={() => setShowInput([true, originalIndex])} 
                  name={player.name} balance={player.balance} cardsCount={player.cardsCount} addStyles={dynamicStyles.playerButtonOverrides} />
                );
              })}
            </View>
          </View>
          
          {!isGameStarted && 
            <TouchableHighlight style={[styles.button, { position: 'absolute', bottom: '5%' }]} underlayColor="#948870" onPress={startGame}>
              <Text style={styles.buttonText}>Start Game</Text>
            </TouchableHighlight>
          }
          {(isGameStarted && currentPlayer && !didEveryoneBet) && (
            <View style={[styles.row, {bottom: '5%'}]}>
              <BetInput max={currentPlayer.balance} onConfirm={(amount) => {
                // ... your bet logic remains the same
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
                console.log(currentPlayer.cardsCount)
                nextPlayer();
              }}/>
            </View>
          )}
          {(isGameStarted && currentPlayer && didEveryoneBet) && (
            <View style={[styles.row, {bottom: '5%', width: '50%'}]}>
              {buttons.includes("hit") && <RoundButton text="Hit" func={hit} mainColor="" secondColor=""/>}
              {buttons.includes("stand") && <RoundButton text="Stand" func={stand} mainColor="" secondColor=""/>}
              {buttons.includes("blackjack") && <RoundButton text="Blackjack" func={blackjack} mainColor="" secondColor=""/>}
              {buttons.includes("double") && <RoundButton text="Double" func={double} mainColor="" secondColor=""/>}
              {buttons.includes("insurance") && <RoundButton text="Insurance" func={insurance} mainColor="" secondColor=""/>}
              {buttons.includes("busted") && <RoundButton text="Busted" func={busted} mainColor="" secondColor=""/>}
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
            <Modal onRequestClose={() => setShowdownVisible(false)} transparent={true} animationType="fade">
              <Pressable style={styles.popUp} onPress={() => setShowdownVisible(false)}>
                <TouchableWithoutFeedback>
                  <View style={[styles.popUpInside, dynamicStyles.popUpInside]}>
                    <TouchableHighlight style={styles.closeButton} underlayColor="transparent" onPress={() => setShowdownVisible(false)}>
                      <Text style={[styles.buttonText, {fontSize: 24, color: '#fff'}]}>×</Text>
                    </TouchableHighlight>


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
                    <TouchableHighlight style={styles.closeButton} underlayColor="transparent" onPress={() => setShowInsurance(false)}>
                      <Text style={[styles.buttonText, {fontSize: 24, color: '#fff'}]}>×</Text>
                    </TouchableHighlight>

                    <Text>Does Dealer have blackjack</Text>
                    <TouchableHighlight style={styles.dodajButton} underlayColor="#948870" onPress={() => {
                      players.forEach(p => {if(p.lastAction == 'insurance') { p.balance += p.currentBet/3*2; p.currentBet -= p.currentBet/3; p.lastAction = '' }});
                      setShowInsurance(false);
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
      </SafeAreaView>
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
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  column: {
    justifyContent: 'flex-start',
    gap: 30,
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
    justifyContent: 'space-around',
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
  }
});

export default BlackjackGame;