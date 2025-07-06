import React, { useEffect, useRef, useState } from "react";
import { Text, StyleSheet, View, TouchableHighlight, Dimensions, TextInput, Modal } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useRoute } from "@react-navigation/native";

import * as ScreenOrientation from 'expo-screen-orientation';

import RootStackParamList from "../../props/RootStackParamList";
import Svg, { Rect } from "react-native-svg";
import RoundButton from "../../components/RoundButton";
import BlackjackPlayer from "../../classes/BlackjackPlayer";

type GameRouteProp = RouteProp<RootStackParamList, "Game">;

type EdgeConfig = {
  pos: { [key: string]: number | string };
  dir: 'row' | 'column';
  len: number;
  prefix: string;
  addStyle?: object;
};

const screenWidth = Dimensions.get('window').width;


const BlackjackGame = () => {
  const route = useRoute<GameRouteProp>();
  const { playersCount } = route.params;
  const maxPlayers = playersCount

  const [players, setPlayers] = useState<BlackjackPlayer[]>(
    Array.from({ length: maxPlayers }, () => new BlackjackPlayer())
  );
  const dealer = useRef<BlackjackPlayer>(new BlackjackPlayer('Dealer'));
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [showInput, setShowInput] = useState([false, -1]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const { width, height } = Dimensions.get('window');

  function startGame() {
    console.log(players)
    players.forEach((player, i) => {
      player.currentBet = 0;
      player.isDealer = false;

      if (player.name == "") player.name = `Player${i+1}`;
    });

    setIsGameStarted(true);
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
          <TouchableHighlight style={[styles.button, {position: 'absolute', top: height * 0.015, backgroundColor: 'blue'}]} underlayColor="#948870">
            <Text style={[styles.buttonText, {color: '#fff'}]} numberOfLines={1} ellipsizeMode="tail">
              {dealer.current.name}
            </Text>
          </TouchableHighlight>
          <View style={[styles.content]}>
            <View style={[styles.row, {bottom: '25%'}]}>
              {players.map((player: BlackjackPlayer, index: number) => {
                const isFirst = index === 0;
                const isLast = index === players.length-1;

                const extraStyle = isFirst ? { bottom: height * 0.15, left: width * 0.075 } : isLast ? { bottom: height * 0.15, right: width * 0.075 } : { bottom: 0 };

                return (
                  <TouchableHighlight
                    key={index+1}
                    style={[styles.button, extraStyle]}
                    underlayColor="#948870"
                    onPress={() => { setShowInput([true, index]); }}
                  >
                    <Text style={[styles.buttonText, {color: '#000'}]} numberOfLines={1} ellipsizeMode="tail">
                      {player.name !== '' ? player.name : '+' + index}
                    </Text>
                  </TouchableHighlight>
                )
              })}
            </View>
          </View>
          {!isGameStarted && 
            <TouchableHighlight style={[styles.button, { marginBottom: '4%' }]} underlayColor="#948870" onPress={() => {startGame()}}>
              <Text style={styles.buttonText}>Start Game</Text>
            </TouchableHighlight>
          }
          {isGameStarted && (
            <View style={[styles.row, {bottom: 0}]}>
              <RoundButton text="Raise" func={() => {}} mainColor="red" secondColor="#a20000"/>
              <RoundButton text="Fold" func={() => {}} mainColor="blue" secondColor="#0000a9"/>
            </View>
          )}
          
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

                  <Text style={{ marginBottom: 10, color: '#fff' }}>Podaj coś:</Text>
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
                    onPress={() => {setPlayers(players => players.map((player, index) => index === showInput[1] ? new BlackjackPlayer(inputValue) : player)); setShowInput([false, -1])}}>
                    <Text>Dodaj</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0e0e0e',
    position: 'relative'
  },
  container: {
    flex: 1,
    display: 'flex'
  },
  background: {
    position: "absolute",
    top: '50%',
    left: '50%',
    width: '100%',
    height: '80%',
    transform: [{ translateX: '-50%' }, { translateY: '-70%' }]
  },
  content: {
    position: 'relative',
    flex: 1,
    top: '50%',
    left: '50%',
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }]
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
    minWidth: screenWidth * .1,
    maxWidth: screenWidth * .12,
    backgroundColor: '#cbbb9c',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
    color: '#fff',
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
    backgroundColor: "#121212",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: '#222',
    color: '#fff',
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
    alignSelf: 'center',
    gap: 15,
  },
});

export default BlackjackGame;
