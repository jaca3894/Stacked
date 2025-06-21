import React, { useState } from "react";
import { ImageBackground, Text, StyleSheet, View, TouchableHighlight, Dimensions, TextInput, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";

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
  prefix: string;
  addStyle?: object;
};

const screenWidth = Dimensions.get('window').width;

const PokerGame = () => {
  const route = useRoute<GameRouteProp>();
  const { playersCount } = route.params;
  const [top, right, bottom, left] = seatingPlan[playersCount] ?? [0, 0, 0, 0];
  const maxPlayers = top + right + bottom + left;

  const [players, setPlayers] = useState<string[]>(Array(maxPlayers).fill(''));

  const [showInput, setShowInput] = useState([false, -1]);
  const [inputValue, setInputValue] = useState("");

  const edges: EdgeConfig[] = [
    { pos: { top: '5%' }, dir: 'row', len: top, prefix: 'T' },
    { pos: { right: '1%' }, dir: 'column', len: right, prefix: 'R' },
    { pos: { bottom: '5%' }, dir: 'row', len: bottom, prefix: 'B', addStyle: { flexDirection: 'row-reverse' } },
    { pos: { left: '1%' }, dir: 'column', len: left, prefix: 'L', addStyle: { flexDirection: 'column-reverse' } },
  ];

  let globalIndex = 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../../assets/pokerTable.png')}
        style={styles.background}
        resizeMode="contain"
      >
        <View style={[styles.content]}>
          {edges.map(({ pos, dir, len, prefix, addStyle }) => (
            <View key={prefix} style={[styles[dir], pos, addStyle]}>
              {Array.from({ length: len }).map((_, j) => {
                const currentIndex = globalIndex++;
                return (
                <TouchableHighlight key={j+1} style={styles.button} underlayColor="#948870" onPress={() => {setShowInput([true, currentIndex])}}>
                  <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">{players[currentIndex] != '' ? players[currentIndex] : '+' + currentIndex}</Text>
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
                  onPress={() => {setPlayers(players => players.map((player, index) => index === showInput[1] ? inputValue : player)); setShowInput([false, -1])}}>
                  <Text>Dodaj</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
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
    width: '90%',
    left: '50%',
    transform: [{translateX: '-50%'}]
  },
  column: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '90%',
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
  }
});

export default PokerGame;
