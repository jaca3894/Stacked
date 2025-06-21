import React from 'react';
import { Text, Image, StyleSheet, TouchableHighlight, Dimensions, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const PlayScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.mainContainer}>
            <Text style={styles.title}>What do you want to{'\n'}track today?</Text>

            <TouchableHighlight
              style={styles.button}
              onPress={() => (navigation as any).navigate('ChoosePlayersAmount', { gameType: 'PokerGame' })}
            >
              <View style={styles.buttonView}>
                <Text style={styles.buttonText}>Poker</Text>
                <Image style={styles.arrow} source={require('../assets/arrowRight.png')} resizeMode="cover" />
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.button}
              onPress={() => (navigation as any).navigate('ChoosePlayersAmount', { gameType: 'BlackjackGame' })}
            >
              <View style={styles.buttonView}>
                <Text style={styles.buttonText}>Blackjack</Text>
                <Image style={styles.arrow} source={require('../assets/arrowRight.png')} resizeMode="cover" />
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.button}
              onPress={() => (navigation as any).navigate('ChoosePlayersAmount', { gameType: 'RouletteGame' })}
            >
              <View style={styles.buttonView}>
                <Text style={styles.buttonText}>Roulette</Text>
                <Image style={styles.arrow} source={require('../assets/arrowRight.png')} resizeMode="cover" />
              </View>
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>2025 Stacked.</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  content: {
    height: '85%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    height: '15%',
    backgroundColor: '#1c1c1c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: screenHeight * 0.15,
    height: screenHeight * 0.15,
    marginBottom: 30,
  },
  mainContainer: {
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginVertical: 8,
    width: screenWidth * 0.7,
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  arrow: {
    height: 20,
    width: 20,
  },
  footerText: {
    color: 'gray',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default PlayScreen;
