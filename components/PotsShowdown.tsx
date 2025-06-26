import {Modal, Text, View, StyleSheet, Dimensions, TouchableOpacity, TouchableHighlight, StatusBar } from 'react-native';
import Pot from '../classes/Pot';
import Player from '../classes/Player';
import { useState } from 'react';

const [screenWidth, screenHeight] = [
  Dimensions.get('window').width,
  Dimensions.get('window').height,
];

const PotsShowdown = ({pots, players, onClose}: {pots?: Pot[]; players: Player[]; onClose: () => void;}) => {
  if(pots) console.log(pots[0].playersNames)
  if(pots) console.log(pots[0])
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
    onClose();
  }

  return (
    <Modal transparent animationType="fade" statusBarTranslucent>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.5)" />
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
                {players
                  .map((player, playerIndex) => ({ player, playerIndex }))
                  .filter(({ player }) => pot.playersNames.includes(player.name))
                  .map(({ player, playerIndex }) => (
                    <TouchableOpacity
                      key={playerIndex + 1}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  popUpInside: {
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
