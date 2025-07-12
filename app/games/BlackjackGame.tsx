import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  Dimensions,
  TextInput,
  Modal,
  Pressable, // For modal
  TouchableWithoutFeedback, // For modal
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useRoute } from "@react-navigation/native";
import * as ScreenOrientation from 'expo-screen-orientation';
import Svg, { Path, Rect } from "react-native-svg";
import Toast from "react-native-toast-message";

import RootStackParamList from "../../props/RootStackParamList";
import BlackjackPlayer from "../../classes/BlackjackPlayer";
import BetInput from "../../components/BetInput";
import toastConfig from "../../config/ToastConfig";
import RoundButton from "../../components/RoundButton";

type GameRouteProp = RouteProp<RootStackParamList, "Game">;

const { width, height } = Dimensions.get('window');

const BlackjackGame = () => {
  const route = useRoute<GameRouteProp>();
  const { playersCount } = route.params;

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

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  // --- Data Preparation for Columns (kept from previous suggestion for cleanliness) ---
  const splitIndex = Math.ceil(players.length / 2);
  const firstColumnPlayers = players.slice(0, splitIndex);
  const secondColumnPlayers = players.slice(splitIndex);

  function startGame() {
    const updatedPlayers = players.map((player, i) => {
      player.currentBet = 0;
      player.isDealer = false;
      if (player.name === "") player.name = `Player ${i + 1}`;
      return player;
    });
    setPlayers(updatedPlayers);
    setCurrentPlayerIndex(0);
    setIsGameStarted(true);
  }
  
  function endGame() {
    setCurrentPlayerIndex(-1);
    setIsGameStarted(false);
  }

  function nextPlayer() {
    const newIndex = (currentPlayerIndex + 1) % players.length
    setCurrentPlayerIndex(newIndex);
    if(newIndex == 0) {
      setDidEveryoneBet(true);
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Background SVG remains the same */}
          <Svg style={styles.background} viewBox="0 0 1200 600">
            <Rect x={0} y={0} width={1200} height={600} rx={180} ry={300} fill="#2E1C1C" />
            <Rect x={20} y={20} width={1160} height={560} rx={160} ry={280} fill="#4d342f" />
            <Rect x={40} y={40} width={1120} height={520} rx={140} ry={260} fill="#006400" />
            <Rect x={200} y={150} width={800} height={300} rx={100} ry={180} fill="none" stroke="#005000" strokeWidth={12} />
          </Svg>

          {/* Dealer Button (using your original styling) */}
          <View style={styles.dealerButton}>
            <Text style={[styles.buttonText, {color: '#fff'}]} numberOfLines={1} ellipsizeMode="tail">
              {dealer.current.name}
            </Text>
          </View>

          {/* ==================================================== */}
          {/* NEW FLEXBOX LAYOUT WITH YOUR ORIGINAL BUTTON LOGIC   */}
          {/* ==================================================== */}
          <View style={styles.playersContainer}>
            {/* --- First Column --- */}
            <View style={[styles.column, { flexDirection: 'column-reverse', alignItems: 'flex-start'}]}>
              {firstColumnPlayers.map((player, index) => (
                <TouchableHighlight
                  key={`player-${index}`}
                  style={[
                    styles.button,
                    { minWidth: width * .1, maxWidth: width * .15 },
                    // This dynamic style is much cleaner than multiple inline properties
                    player === currentPlayer && styles.currentPlayerHighlight,
                  ]}
                  underlayColor="#948870"
                  onPress={() => setShowInput([true, index])}
                  disabled={isGameStarted}
                >
                  <Text style={[styles.buttonText, {color: '#000'}]} numberOfLines={1} ellipsizeMode="tail">
                    {player.name || '+'}
                  </Text>
                </TouchableHighlight>
              ))}
            </View>

            {/* --- Second Column --- */}
            <View style={[styles.column, { flexDirection: 'column', alignItems: 'flex-start'}]}>
              {secondColumnPlayers.map((player, index) => {
                const originalIndex = index + splitIndex;
                return (
                  <TouchableHighlight
                    key={`player-${originalIndex}`}
                    style={[
                      styles.button,
                      { minWidth: width * .1, maxWidth: width * .15 },
                      player === currentPlayer && styles.currentPlayerHighlight,
                    ]}
                    underlayColor="#948870"
                    onPress={() => setShowInput([true, originalIndex])}
                    disabled={isGameStarted}
                  >
                    <Text style={[styles.buttonText, {color: '#000'}]} numberOfLines={1} ellipsizeMode="tail">
                      {player.name || '+'}
                    </Text>
                  </TouchableHighlight>
                );
              })}
            </View>
          </View>
          
          {/* --- Restored Original Game Controls --- */}
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
                nextPlayer();
              }}/>
            </View>
          )}
          {(isGameStarted && currentPlayer && didEveryoneBet) && (
            <View style={[styles.row, {bottom: '5%', width: '50%'}]}>
              <RoundButton text="Hit" func={() => {}} mainColor="" secondColor=""/>
              <RoundButton text="Stand" func={() => {}} mainColor="" secondColor=""/>
              <RoundButton text="Blackjack" func={() => {}} mainColor="" secondColor=""/>
              <RoundButton text="Double" func={() => {}} mainColor="" secondColor=""/>
              <RoundButton text="Insurance" func={() => {}} mainColor="" secondColor=""/>
            </View>
          )}

          {/* --- Updated Modal with Click-Outside --- */}
          {showInput[0] && (
            <Modal onRequestClose={() => setShowInput([false, -1])} transparent={true} animationType="fade">
              <Pressable style={styles.popUp} onPress={() => setShowInput([false, -1])}>
                <TouchableWithoutFeedback>
                  <View style={styles.popUpInside}>
                    <TouchableHighlight style={styles.closeButton} underlayColor="transparent" onPress={() => setShowInput([false, -1])}>
                      <Text style={[styles.buttonText, {fontSize: 24}]}>×</Text>
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
        </View>
      </SafeAreaView>
      <Toast config={toastConfig} swipeable />
    </SafeAreaProvider>
  );
};

// ====================================================================
// Updated Stylesheet
// ====================================================================
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
  // --- This container is the key to the new layout ---
  playersContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '75%', // Adjust height to control how high the players go
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: width * .1
  },
  // --- Style for each column ---
  column: {
    justifyContent: 'flex-start',
    gap: 15, // Adds vertical spacing between players
    paddingBottom: height * 0.1, // Pushes the lowest player up from the edge
  },
  // --- Your original button style ---
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
  // A cleaner way to highlight the current player
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
  },
  // --- Your original row style for the BetInput ---
  row: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    left: '50%',
    transform: [{translateX: '-50%'}]
  },
  // --- Modal styles ---
  popUp: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popUpInside: {
    width: width * 0.4,
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
    top: height * 0.05,
    backgroundColor: '#1a237e', // Darker blue
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#5c6bc0',
  }
});

export default BlackjackGame;