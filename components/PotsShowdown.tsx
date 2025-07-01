import {Modal, Text, View, StyleSheet, Dimensions, TouchableOpacity, TouchableHighlight, StatusBar } from 'react-native';
import Pot from '../classes/Pot';
import Player from '../classes/Player';
import { useEffect, useState } from 'react';

const [screenWidth, screenHeight] = [
  Dimensions.get('window').width,
  Dimensions.get('window').height,
];

const PotsShowdown = ({ players, allIns, onClose }: { players: Player[]; allIns: Record<string, number>; onClose: () => void }) => {
  const [selectedPotWinners, setSelectedPotWinners] = useState<Record<number, Player[]>>({});
  const [pots, setPots] = useState<Pot[]>([new Pot(players.filter(player => !player.folded))]);

  useEffect(() => {
    const generatedPots = myCreateSidePots();
    setPots(generatedPots);
  }, [players]);

  const handleSelectWinner = (potIndex: number, player: Player) => {
    setSelectedPotWinners(prev => {
      const currentWinners = prev[potIndex] || [];
      const isAlreadySelected = currentWinners.includes(player);

      const updatedWinners = isAlreadySelected
        ? currentWinners.filter(p => p !== player) // remove
        : [...currentWinners, player]; // add

      return {
        ...prev,
        [potIndex]: updatedWinners,
      };
    });
  };

  const addMoneyToWinners = () => {
    pots.forEach((pot, index) => {
      const winners = selectedPotWinners[index];
      if (!winners || winners.length === 0) {
        alert(`No winner selected for ${pot.name}`);
        return;
      }

      const share = pot.balance / winners.length;
      winners.forEach(winner => {
        winner.balance += share;
      });
    });
    onClose();
  };

  const myCreateSidePots = () => {
    const activePlayers = players.filter(p => !p.folded);
    const sorted = [...activePlayers].sort((a, b) => a.currentBet - b.currentBet);
    console.log(sorted);

    const pots: Pot[] = [];
    let previousBet = 0

    for(let i = 0; i < sorted.length; i++) {
      const currentBet = sorted[i].currentBet;
      const contributingPlayers = sorted.slice(i);

      const betDifference = currentBet - previousBet;

      if (betDifference > 0) {
        const potAmount = betDifference * contributingPlayers.length;

        const pot = new Pot([...contributingPlayers]);
        pot.name = i === 0 ? 'Main Pot' : `Side Pot ${pots.length}`;
        pot.balance = potAmount;
        pots.push(pot);

        previousBet = currentBet;
      }
    }
    return pots;
  }

  return (
    <Modal transparent animationType="fade" statusBarTranslucent>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.5)" />
      <View style={styles.popUp}>
        <View style={styles.popUpInside}>
          <Text style={{ color: '#fff', fontSize: 35 }}>Showdown</Text>
          <Text style={{ color: 'hsl(0, 0%, 50%)' }}>Select pot winner(s)</Text>

          {pots.map((pot, potIndex) => {
            const winners = selectedPotWinners[potIndex] || [];

            return (
              <View key={potIndex+1} style={{ marginBottom: 10, padding: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>
                  {`${pot.name}: ${pot.balance}`}
                </Text>
                <View style={styles.playersView}>
                  {players
                    .filter(player => pot.players.includes(player))
                    .map((player, playerIndex) => {
                      const isSelected = winners.includes(player);

                      return (
                        <TouchableOpacity
                          key={playerIndex+1}
                          style={[
                            styles.playerButton,
                            isSelected && styles.playerSelected,
                          ]}
                          onPress={() => handleSelectWinner(potIndex, player)}
                        >
                          <Text style={styles.text}>{player.name}</Text>
                        </TouchableOpacity>
                      );
                    })}
                </View>
                <Text style={styles.selectedPlayersText}>
                  Selected {winners.length}/{pot.players.length}
                </Text>
              </View>
            );
          })}

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
    marginTop: 10,
  },
  playerButton: {
    borderColor: '#33f',
    borderWidth: 2,
    borderRadius: 6,
    padding: 8,
    margin: 4,
  },
  playerSelected: {
    backgroundColor: '#33f',
  },
  selectedPlayersText: {
    marginTop: '1%',
    color: 'hsl(0, 0%, 75%)',
    textAlign: 'center'
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
