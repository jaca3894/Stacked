import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, TextInput, StyleSheet, TouchableOpacity, View, Dimensions, Image, SafeAreaView } from "react-native";
import { useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import RootStackParamList from "../../props/RootStackParamList";
import Toast from "react-native-toast-message";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

type ChoosePlayersAmountProp = RouteProp<RootStackParamList, "ChoosePlayersAmount">;

const ChoosePlayersAmount = () => {
  const [playersAmount, setPlayersAmount] = useState('');
  const [initialBalance, setInitialBalance] = useState('');
  const navigation = useNavigation<any>();
  const route = useRoute<ChoosePlayersAmountProp>();
  const { gameType } = route.params;

  const finalPlayersAmount = playersAmount === '' ? 2 : parseInt(playersAmount, 10);

  const handleStart = () => {
    if (
      playersAmount !== '' &&
      initialBalance !== '' &&
      +playersAmount >= 2 &&
      +initialBalance >= 100
    ) {
      navigation.navigate(gameType, {
        playersCount: finalPlayersAmount,
        initialBalance,
      });
    }
    else{
      Toast.show({
        type: 'error',
        text1: 'Invalid game parameters',
        text2: 'Players ≥ 2 and balance ≥ 100',
        position: 'top',
        text1Style: { fontSize: 20, fontWeight: 'bold', color: '#cbbb9c', textAlign: "left" },
        text2Style: { fontSize: 12, color: 'gray' },

        swipeable: true,
      });
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image
              source={require('../../assets/arrowRight.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Table setup</Text>
        </View>

        {/* CONTENT */}
        <View style={styles.content}>
          <Text style={styles.title}>Amount of players</Text>
          <TextInput
            style={styles.input}
            value={playersAmount}
            onChangeText={(text) => {
              const numeric = text.replace(/\D/g, '');
              if (numeric === '') return setPlayersAmount('');
              let number = parseInt(numeric, 10);
              if (number < 1) number = 1;
              if (number > 12) number = 12;
              setPlayersAmount(number.toString());
            }}
            keyboardType="numeric"
            placeholder="2-12"
            placeholderTextColor="#888"
            maxLength={2}
          />

          <Text style={styles.title}>Initial balance</Text>
          <TextInput
            style={styles.input}
            value={initialBalance}
            onChangeText={(text) => {
              const numeric = text.replace(/\D/g, '');
              if (numeric === '') return setInitialBalance('');
              let number = parseInt(numeric, 10);
              if (number < 1) number = 1;
              if (number > 10000) number = 10000;
              setInitialBalance(number.toString());
            }}
            keyboardType="numeric"
            placeholder="100-10000"
            placeholderTextColor="#888"
            maxLength={5}
          />

          <TouchableOpacity onPress={handleStart} style={styles.button}>
            <Text style={styles.buttonText}>Start Game</Text>
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>2025 Stacked.</Text>
        </View>
      </SafeAreaView>
      <Toast />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: '#1c1c1c',
  },
  header: {
    height: "20%",
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#1c1c1c',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
    transform: [{ scaleX: -1 }],
  },
  headerText: {
    width: '80%',
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    height: "60%",
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1c1c1c',
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    color: 'white',
    fontSize: 22,
    borderWidth: 2,
    borderColor: '#888',
    borderRadius: 8,
    padding: 10,
    width: '50%',
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
  },
  footer: {
    height: "20%",
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
  },
  footerText: {
    color: 'gray',
    fontSize: 16,
  },
});


export default ChoosePlayersAmount;
