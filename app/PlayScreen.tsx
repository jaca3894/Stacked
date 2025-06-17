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
        <Image
          source={require('../assets/logo.png')} // Podmień na swoją ścieżkę do logo
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.mainContainer}>
          <Text style={styles.title}>What do you want to{'\n'}track today?</Text>

          <TouchableHighlight style={styles.button} onPress={() => (navigation as any).navigate('Poker Screen')}>
            <View style={styles.buttonView}>
              <Text style={styles.buttonText}>Poker</Text>
              <Image style={styles.arrow} source={require('../assets/arrowRight.png')} resizeMode="cover"></Image>
            </View>
          </TouchableHighlight>

          <TouchableHighlight style={styles.button} onPress={() => (navigation as any).navigate('Blackjack Screen')}>
            <View style={styles.buttonView}>
              <Text style={styles.buttonText}>Blackjack</Text>
              <Image style={styles.arrow} source={require('../assets/arrowRight.png')} resizeMode="cover"></Image>
            </View>
          </TouchableHighlight>

          <TouchableHighlight style={styles.button} onPress={() => (navigation as any).navigate('Roulette Screen')}>
            <View style={styles.buttonView}>
              <Text style={styles.buttonText}>Roulette</Text>
              <Image style={styles.arrow} source={require('../assets/arrowRight.png')} resizeMode="cover"></Image>
            </View>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    alignItems: 'center',
    paddingTop: 40,
  },
  logo: {
    width: screenHeight * 0.15,
    height: screenHeight * 0.15,
    marginBottom: 30,
  },
  mainContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -screenWidth * .35 }, { translateY: -screenHeight * .05 }],
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
    alignItems: 'center',
    position: 'relative',
  },
  buttonView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  arrow: {
    height: 20,
    width: 20,
    position: 'absolute',
    right: 0,
  }
});

export default PlayScreen;