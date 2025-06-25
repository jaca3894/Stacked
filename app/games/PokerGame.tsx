import React, { useState } from "react";
import { ImageBackground, Text, StyleSheet, View, TouchableHighlight, Dimensions, TextInput, Modal } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import Player from "../../classes/Player";
import Pot from "../../classes/Pot";

import GameRouteProp from "../../props/GameProps";

import CustomSlider from "../../components/Slider";
import RoundButton from "../../components/RoundButton";
import Card from "../../components/Card";
import PotsShowdown from "../../components/PotsShowdown";

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
  const [minAmount, setMinAmount] = useState(0);
  const [smallBlindAmount, bigBlindAmount] = [5, 10];
  const [shownCards, setShownCards] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(-1);
  const [biggestBetPlayerIndex, setBiggestBetPlayerIndex] = useState(-1);

  const [canRaise, setCanRaise] = useState(true);

  const [showInput, setShowInput] = useState([false, -1]);
  const [inputValue, setInputValue] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSliderShown, setIsSliderShown] = useState(false);

  const edges: EdgeConfig[] = [
    { pos: { top: '5%' }, dir: 'row', len: top },
    { pos: { right: '1%' }, dir: 'column', len: right },
    { pos: { bottom: '5%' }, dir: 'row', len: bottom, addStyle: { flexDirection: 'row-reverse' } },
    { pos: { left: '1%' }, dir: 'column', len: left, addStyle: { flexDirection: 'column-reverse' } },
  ];

  let globalIndex = 0;

  function startGame() {
    const playersNames = players.map(player => player.name);
    const mainPot = new Pot(playersNames, "Main Pot", smallBlindAmount + bigBlindAmount);
    const dealerIndex = Math.floor(Math.random() * maxPlayers);

    const smallBlindIndex = (dealerIndex + 1) % maxPlayers;
    const bigBlindIndex = (dealerIndex + 2) % maxPlayers;

    players.forEach((player, i) => {
      if (player.name == '') player.name = `Player${i + 1}`;
      player.isDealer = i === dealerIndex;
      if (i === smallBlindIndex) {player.take(smallBlindAmount); player.setLastAction("SB")}
      if (i === bigBlindIndex) {player.take(bigBlindAmount); player.setLastAction("BB")}
    });

    setBiggestBetPlayerIndex(bigBlindIndex);
    setPots([mainPot]);
    setMinAmount(bigBlindAmount);
    setCurrentPlayerIndex((dealerIndex + 3) % maxPlayers);
    setIsGameEnded(false);
  }

  function endGame() {
    setCurrentPlayerIndex(-1);
    setIsGameEnded(true);
  }

  function nextPlayer() {
    let newPlayerIndex = (currentPlayerIndex + 1) % maxPlayers;
    while (players[newPlayerIndex].didFold) {
      if (newPlayerIndex == currentPlayerIndex) return; // If looped back to current player, stop game
      if (newPlayerIndex >= maxPlayers-1) newPlayerIndex = 0;
      newPlayerIndex++;
    }
    setCurrentPlayerIndex(newPlayerIndex);
    if(players[newPlayerIndex].balance == 0) setCanRaise(false);
    else setCanRaise(true);
  }

  function call() {
    if (currentPlayerIndex === -1) return; // No current player
    const player = players[currentPlayerIndex];
    if(player.lastAction == "SB")
      players[currentPlayerIndex].take(bigBlindAmount-smallBlindAmount);
    else
      players[currentPlayerIndex].take(minAmount);
    if(!pots) return;
    pots[0].add(minAmount);
    player.setLastAction("call");

    if(players.every(player => player.balance == 0)) {
      setIsGameEnded(true);
    }

    nextPlayer();

    if (currentPlayerIndex == biggestBetPlayerIndex) {
      if (shownCards < 5) {
        showCards();
        players.forEach(p => p.lastAction = '');
        setMinAmount(0);
        setCurrentPlayerIndex((players.findIndex(p => !p.didFold) + 1) % maxPlayers);
      }
      else
        endGame();
    }
    else
      nextPlayer();
  }

  function check() {
    players[currentPlayerIndex].lastAction = "check";
    if (currentPlayerIndex == biggestBetPlayerIndex) {
      if (shownCards < 5) {
        showCards();
        players.forEach(p => p.lastAction = '');
        const dealerIndex = players.findIndex(p => p.isDealer);
        let foundNext = false;
        let newPlayerIndex = (dealerIndex+1) % maxPlayers;
        while(!foundNext) {
          if(!players[newPlayerIndex].didFold) foundNext = true;
          else newPlayerIndex = (newPlayerIndex + 1) % maxPlayers;
        }
        setCurrentPlayerIndex(newPlayerIndex);
        setBiggestBetPlayerIndex(newPlayerIndex-1);
      }
      else
        endGame();
    }
    else
      nextPlayer();
  }

  function raise(amount: number) {
    if(amount > minAmount) setBiggestBetPlayerIndex(currentPlayerIndex);
    setMinAmount(amount);
    const player = players[currentPlayerIndex];
    const raiseAmount = amount - player.currentBet;
    player.take(raiseAmount)
    if(!pots) return;
    pots[0].add(amount);
    player.lastAction = "raise";
    setIsSliderShown(false)
    nextPlayer();
  }

  function fold() {
    let playersLeft = 0;
    players[currentPlayerIndex].fold();
    players.forEach(player => player.didFold ? null : playersLeft++);
    players[currentPlayerIndex].lastAction = "fold";
    if(playersLeft == 1) {
      // If only one player left, they win the pot
      const winnerIndex = players.findIndex(player => !player.didFold);
      if (pots) {
        players[winnerIndex].give(pots[0].balance);
        setPots([]);
      }
      endGame();
    }
    else
      nextPlayer();
  }

  function showCards() {
    const amount = shownCards == 0 ? 3 : 1;
    setShownCards(prev => prev + amount);
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
                    const player = players[currentIndex]
                    const isCurrentPlayer = currentPlayerIndex != -1 && currentIndex == currentPlayerIndex;
                    return (
                    <TouchableHighlight key={j+1} disabled={isGameStarted} style={[styles.button, {borderColor: isCurrentPlayer ? 'yellow' : 'white', borderWidth: isCurrentPlayer ? 4 : 2, opacity: player.didFold ? 0.5 : 1}]} underlayColor="#948870" onPress={() => {if (player.name === '') {setShowInput([true, currentIndex])}}}>
                      <View style={styles.buttonView}>
                        {player.isDealer && (
                          <View style={{position: 'absolute', top: -20, left: -20, backgroundColor: 'white', borderRadius: '50%', width: 30, height: 30, justifyContent: 'center', alignContent: 'center'}}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>D</Text>
                          </View>
                        )}
                        <Text style={styles.buttonText} numberOfLines={2} ellipsizeMode="tail">{player.name != '' ? player.name + '\n' + player.balance : '+'}</Text>
                        {(isGameStarted && player.lastAction != '') && <Text style={styles.blindText}>{player.lastAction}</Text>}
                      </View>
                    </TouchableHighlight>
                  )})}
                </View>
              ))}
              {pots && (
                <View style={styles.potsView}>
                  <View style={styles.cards}>
                    {Array.from({ length: shownCards }).map((_, index) => (
                      <Card key={index+1}/>
                    ))}
                  </View>
                  <Text style={{color: '#000', fontSize: 24}}>{pots.reduce((sum, pot) => sum + pot.balance, 0)}</Text>
                </View>
              )}
            </View>
            {showInput[0] && (
              <Modal onRequestClose={() => setShowInput([false, -1]) } transparent={true} animationType="fade">
                <View style={styles.popUp}>
                  <View style={styles.popUpInside}>
                    <TouchableHighlight style={styles.closeButton} underlayColor="transparent" onPress={() => setShowInput([false, -1])}>
                      <Text style={styles.buttonText}>x</Text>
                    </TouchableHighlight>
                    <Text style={{ marginBottom: 10 }}>Podaj coś:</Text>
                    <TextInput placeholder="Podaj nazwę gracza" style={styles.input} placeholderTextColor="#999" onChange={(e) => {const value = e.nativeEvent.text; setInputValue(value);}}/>
                    <TouchableHighlight style={styles.dodajButton} underlayColor="#948870"
                      onPress={() => {if(inputValue.trim() !== '') { setPlayers(players => players.map((player, index) => index === showInput[1] ? new Player(inputValue) : player)); setShowInput([false, -1]); setInputValue('')}}}>
                      <Text>Dodaj</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
            )}
          </ImageBackground>
          {!isGameStarted && 
            <TouchableHighlight style={styles.button} underlayColor="#948870" onPress={() => {startGame(); ; setIsGameStarted(true);}}>
              <Text style={styles.buttonText}>Start Game</Text>
            </TouchableHighlight>
          }
          {isGameStarted &&
            <View style={styles.buttonsRow}>
              {(biggestBetPlayerIndex != currentPlayerIndex && players[currentPlayerIndex]?.currentBet != minAmount) && (
                <RoundButton text="Call" func={() => call()} mainColor="orange" secondColor="#b47400"/>
              )}
              {(biggestBetPlayerIndex == currentPlayerIndex || players[currentPlayerIndex]?.currentBet == minAmount) && (
                <RoundButton text="Check" func={() => check()} mainColor="green" secondColor="#005700"/>
              )}
              <RoundButton text="Raise" func={() => setIsSliderShown(true)} mainColor="red" secondColor="#a20000" opacity={canRaise ? 1 : .5}/>
              <RoundButton text="Fold" func={() => fold()} mainColor="blue" secondColor="#0000a9"/>
            </View>
          }
        </View>
      </SafeAreaView>
      { isSliderShown && 
        (<View style={styles.popUp}>
          <CustomSlider minimumValue={minAmount+1} maximumValue={players[currentPlayerIndex].balance} step={1} value={minAmount} onValueChange={setSliderValue} onAccept={() => {raise(sliderValue);}}/>
        </View>)
      }
      { isGameEnded && <PotsShowdown pots={pots} players={players}/>}
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
  blindText: {
    backgroundColor: '#111',
    color: 'white',
    padding: 2,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
    textTransform: "capitalize",
    width: '100%'
  },
  potsView: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [{translateX: '-50%'}, {translateY: '-50%'}],
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  cards: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  }
});

export default PokerGame;