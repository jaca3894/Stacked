import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, StyleSheet, TouchableHighlight, Dimensions } from "react-native";
import { useState } from "react";

const screenWidth = Math.round(Dimensions.get('window').width);

const PokerScreen = () => {
  const [value, setValue] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1c1c1c', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#fff', fontSize: 32, fontWeight: 'bold' }}>Players</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={(text) => {
          let numeric = text.replace(/\D/g, '');

          if (numeric === '') return setValue('');

          let number = parseInt(numeric, 10);

          // Ogranicz zakres
          if (number < 1) number = 1;
          if (number > 12) number = 12;

          setValue(number.toString());
        }}
        keyboardType="numeric"
        placeholder="(1-12)"
        placeholderTextColor="#888"
        maxLength={2}
        autoFocus
      />
      <TouchableHighlight>
        <Text style={styles.button}>Start Game</Text>
      </TouchableHighlight>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: '#888',
    borderRadius: 8,
    padding: 10,
    width: '25%',
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
    position: 'relative',
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  }
})

export default PokerScreen;