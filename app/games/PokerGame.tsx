import React, { useState } from "react";
import { ImageBackground, Text, StyleSheet, View, TouchableHighlight, Dimensions, TextInput, Modal } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import Player from "../../classes/Player";
import Pot from "../../classes/Pot";

import GameRouteProp from "../../props/GameProps";

const seatingPlan: Record<number, [number, number, number, number]> = {
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
  dir: 'row' | 'column';
  len: number;
  addStyle?: object;
};

const screenWidth = Dimensions.get('window').width;

const PokerGame = () => {
  const route = useRoute<GameRouteProp>();
  const { playersCount } = route.params;
  const [top, right, bottom, left] = seatingPlan[playersCount];
  const maxPlayers = top + right + bottom + left;

  const [players, setPlayers] = useState<Player[]>(Array.from({ length: maxPlayers }, () => new Player()));
  const [pots, setPots] = useState<Pot[]>();
  const [blinds, setBlinds] = useState<{ smallBlindIndex: number; bigBlindIndex: number }>({ smallBlindIndex: -1, bigBlindIndex: -1 });
  const [smallBlindAmount, bigBlindAmount] = [5, 10];
  const [currentId, setCurrentId] = useState(-1);

  const [showInput, setShowInput] = useState([false, -1]);
  const [inputValue, setInputValue] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  const edges: EdgeConfig[] = [
    { pos: { top: '5%' }, dir: 'row', len: top },
    { pos: { right: '1%' }, dir: 'column', len: right },
    { pos: { bottom: '5%' }, dir: 'row', len: bottom, addStyle: { flexDirection: 'row-reverse' } },
    { pos: { left: '1%' }, dir: 'column', len: left, addStyle: { flexDirection: 'column-reverse' } },
  ];

  let globalIndex = 0;

  function startGame() {
    const newPot = new Pot("Main Pot", smallBlindAmount + bigBlindAmount);
    const dealerIndex = Math.floor(Math.random()*maxPlayers);
    players.forEach((player, i) => {
      if(player.name == '') player.name = `Player${i+1}`
      if(i == dealerIndex) player.isDealer = true;
      else if (i == dealerIndex + 1) player.take(smallBlindAmount);
      else if (i == dealerIndex + 2) player.take(bigBlindAmount);
    });
    setBlinds({ smallBlindIndex: dealerIndex+1, bigBlindIndex: dealerIndex+2 });
    setPots([newPot]);
    setCurrentId(dealerIndex + 3);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ImageBackground
            source={require('../../assets/pokerTable.png')}
            style={styles.background}
            resizeMode="contain"
          >
            <View style={[styles.content]}>
              {edges.map(({ pos, dir, len, addStyle }, index) => (
                <View key={index+1} style={[styles[dir], pos, addStyle]}>
                  {Array.from({ length: len }).map((_, j) => {
                    const currentIndex = globalIndex++;
                    const isCurrentPlayer = currentId != -1 && currentIndex == currentId % maxPlayers;
                    return (
                    <TouchableHighlight key={j+1} style={[styles.button, {borderColor: isCurrentPlayer ? 'yellow' : 'white', borderWidth: isCurrentPlayer ? 4 : 2}]} underlayColor="#948870" onPress={() => {if (players[currentIndex].name === '') {setShowInput([true, currentIndex])}}}>
                      <View style={{width: '100%'}}>
                        {players[currentIndex].isDealer && (
                          <View style={{position: 'absolute', top: -20, left: -20, backgroundColor: 'white', borderRadius: '50%', width: 30, height: 30, justifyContent: 'center', alignContent: 'center'}}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>D</Text>
                          </View>
                        )}
                        <Text style={styles.buttonText} numberOfLines={2} ellipsizeMode="tail">{players[currentIndex].name != '' ? players[currentIndex].name + '\n' + players[currentIndex].balance : '+'}</Text>
                        {(currentIndex == blinds.smallBlindIndex || currentIndex == blinds.bigBlindIndex) && (<Text style={styles.blindText}>{currentIndex == blinds.smallBlindIndex ? "SB" : "BB"}</Text>)}
                      </View>
                    </TouchableHighlight>
                  )})}
                </View>
              ))}
            </View>
            {showInput[0] && (
              <Modal onRequestClose={() => setShowInput([false, -1]) } transparent={true} animationType="fade">
                <View style={styles.popUp}>
                  <View style={styles.popUpInside}>
                    <TouchableHighlight
                      style={styles.closeButton}
                      underlayColor="transparent"
                      onPress={() => setShowInput([false, -1])}
                      >
                      <Text style={styles.buttonText}>x</Text>
                    </TouchableHighlight>

                    <Text style={{ marginBottom: 10 }}>Podaj coś:</Text>
                    <TextInput
                      placeholder="Podaj nazwę gracza"
                      style={styles.input}
                      placeholderTextColor="#999"
                      onChange={(e) => {
                        const value = e.nativeEvent.text;
                        setInputValue(value);
                      }}
                      />
                    <TouchableHighlight style={styles.dodajButton} underlayColor="#948870"
                      onPress={() => {if(inputValue.trim() !== '') { setPlayers(players => players.map((player, index) => index === showInput[1] ? new Player(inputValue) : player)); setShowInput([false, -1]); setInputValue('')}}}>
                      <Text>Dodaj</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
            )}
          </ImageBackground>
          {!gameStarted && 
            <TouchableHighlight style={styles.button} underlayColor="#948870" onPress={() => {startGame(); ; setGameStarted(true);}}>
              <Text style={styles.buttonText}>Start Game</Text>
            </TouchableHighlight>
          }
          {gameStarted &&
            <View style={styles.buttonsRow}>
              <TouchableHighlight style={[styles.circleButton, {backgroundColor: 'orange'}]} underlayColor="#b47400" onPress={() => {}}>
                <Text style={styles.circleButtonText}>Call</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.circleButton, {backgroundColor: 'red'}]} underlayColor="#a20000" onPress={() => {}}>
                <Text style={styles.circleButtonText}>Raise</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.circleButton, {backgroundColor: 'blue'}]} underlayColor="#0000a9" onPress={() => {}}>
                <Text style={styles.circleButtonText}>Fold</Text>
              </TouchableHighlight>
            </View>
          }
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    position: 'relative',
    flex: 1,
  },
  row: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '85%',
    left: '50%',
    transform: [{translateX: '-50%'}]
  },
  column: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '75%',
    top: '50%',
    transform: [{translateY: '-50%'}],
  },
  bottom: {
    flexDirection: 'row-reverse',
  },
  button: {
    minWidth: screenWidth * .2,
    maxWidth: screenWidth * .35,
    backgroundColor: '#cbbb9c',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2,
    padding: 5,
    textAlign: 'center',
  },
  buttonView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
  },
  popUp: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popUpInside: {
    width: screenWidth * 0.7,
    height: screenWidth * 0.7,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
  dodajButton: {
    marginTop: 20,
    backgroundColor: '#cbbb9c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonsRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
  circleButton: {
    borderRadius: '50%',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 3,
  },
  circleButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  blindText: {
    backgroundColor: 'purple',
    color: 'white',
    padding: 2,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
  }
});

export default PokerGame;
