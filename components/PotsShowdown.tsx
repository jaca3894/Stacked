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
    justifyContent: 'center',
    alignItems: 'center',
  },
  popUpInside: {
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