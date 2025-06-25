<<<<<<< Updated upstream
import {
  Modal,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import Pot from '../classes/Pot';
import Player from '../classes/Player';
import { useState } from 'react';

const [screenWidth, screenHeight] = [
  Dimensions.get('window').width,
  Dimensions.get('window').height,
];

const PotsShowdown = ({
  pots,
  players,
  visible,
  onClose,
}: {
  pots?: Pot[];
  players: Player[];
  visible: boolean;
  onClose: () => void;
}) => {
  const [selectedPotWinners, setSelectedPotWinners] = useState<Map<string, Player>>(new Map());

  const handleSelectWinner = (pot: Pot, player: Player) => {
    setSelectedPotWinners((prev) => new Map(prev).set(pot.name, player));
  };

  const addMoneyToWinners = () => {
    pots?.forEach((pot) => {
      const winner = selectedPotWinners.get(pot.name);
      if (winner) {
        winner.balance += pot.balance;
        pot.winner = winner;
      }
    });
    onClose(); // zamyka Modal po zakończeniu
  };

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.popUp}>
        <View style={styles.popUpInside}>
          <Text style={{ color: '#fff', fontSize: 35 }}>Showdown</Text>
          <Text style={{ color: 'hsl(0, 0%, 50%)' }}>Select pot winner(s)</Text>

          {pots?.map((pot) => (
            <View key={pot.name} style={{ marginBottom: 10, padding: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>
                {`${pot.name}: ${pot.balance}`}
              </Text>
              <View style={styles.playersView}>
                {players.map((player, playerIndex) => (
                  <TouchableOpacity
                    key={playerIndex+1}
                    style={[
                      styles.playerButton,
                      selectedPotWinners.get(pot.name)?.name === player.name && styles.playerSelected,
                    ]}
                    onPress={() => handleSelectWinner(pot, player)}
                  >
                    <Text style={styles.text}>{player.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          <TouchableHighlight style={styles.nextButton} onPress={addMoneyToWinners}>
            <Text style={styles.text}>Next Hand</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  popUp: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .6)',
=======
import { Modal, Text, View, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity } from "react-native"
import Pot from "../classes/Pot";
import Player from "../classes/Player";

const [screenWidth, screenHeight] = [Dimensions.get('window').width, Dimensions.get('window').height];

const PotsShowdown = ({pots, players}: {pots?: Pot[], players: Player[]}) => {
  const chunkedPlayers: Player[][] = [];
  for (let i = 0; i < players.length; i += 2) {
    chunkedPlayers.push(players.slice(i, i + 2));
  }

  function addMoneyToWinners() {
   pots?.forEach(pot => {
    if(pot.winner) pot.winner.balance += pot.balance;
   }) 
  }

  return (
    <Modal>
      <View style={styles.popUp}>
        <View style={styles.popUpInside}>
          <Text style={{color: '#fff', fontSize: 35}}>Showdown</Text>
          <Text style={{color: 'hsl(0, 0%, 50%)'}}>Select pot winner(s)</Text>
          {pots?.map(pot => (
            <View key={pot.name} style={{ marginBottom: 10, padding: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>{`${pot.name}: ${pot.balance}`}</Text>
              <View style={styles.playersView}>
                {chunkedPlayers.map((row, rowIndex) => (
                  <View key={rowIndex+1}></View>
                ))}
                {players.map((player, playerIndex) => (
                  <TouchableOpacity style={styles.playerButton} key={playerIndex+1} onPress={() => pot.winner = player}><Text>{player.name}</Text></TouchableOpacity>
                ))}
              </View>
            </View>
          ))} 
          <TouchableHighlight onPress={() => addMoneyToWinners()}><Text>Next hand</Text></TouchableHighlight>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  popUp: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, .5)',
>>>>>>> Stashed changes
    justifyContent: 'center',
    alignItems: 'center',
  },
  popUpInside: {
<<<<<<< Updated upstream
    width: screenWidth * 0.95,
    height: screenHeight * 0.8,
    backgroundColor: '#121212',
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
  },
  playersView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  playerButton: {
    borderColor: '#cbbb9c',
    borderWidth: 2,
    borderRadius: 6,
    padding: 8,
    margin: 4,
  },
  playerSelected: {
    backgroundColor: '#cbbb9c',
  },
  text: {
    color: '#fff',
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#cbbb9c',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
});

export default PotsShowdown;
=======
    width: screenWidth * .95,
    height: screenHeight * .8,
    backgroundColor: '#121212',
    borderRadius: 10,
    alignItems: 'center',
  },
  playersView: {
    display: 'flex',
    flexDirection: 'row',

  },
  playerButton: {
    borderColor: 'blue',
    borderWidth: 2,
  },
  text: {
    color: '#fff'
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

});

export default PotsShowdown
>>>>>>> Stashed changes
