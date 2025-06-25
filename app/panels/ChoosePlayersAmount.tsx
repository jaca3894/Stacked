import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import RootStackParamList from "../../props/RootStackParamList";


type ChoosePlayersAmountProp = RouteProp<RootStackParamList, "ChoosePlayersAmount">;

const ChoosePlayersAmount = () => {
  const [value, setValue] = useState('');
  const navigation = useNavigation<any>();

  const route = useRoute<ChoosePlayersAmountProp>();
  const { gameType } = route.params;

  const finalValue = value === '' ? 2 : parseInt(value, 10);


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Players</Text>
      
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={(text) => {
          let numeric = text.replace(/\D/g, '');

          if (numeric === '') return setValue('');

          let number = parseInt(numeric, 10);
          if (number < 1) number = 1;
          if (number > 12) number = 12;

          setValue(number.toString());
        }}
        keyboardType="numeric"
        placeholder="2-12"
        placeholderTextColor="#888"
        maxLength={2}
        autoFocus
      />

      <TouchableOpacity
        onPress={() => {if(+value != 1) navigation.navigate(gameType, { playersCount: finalValue })}}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
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
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ChoosePlayersAmount;
