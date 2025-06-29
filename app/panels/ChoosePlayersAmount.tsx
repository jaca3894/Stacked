import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, StyleSheet, TouchableOpacity, View, Dimensions, Image } from "react-native";
import { useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import RootStackParamList from "../../props/RootStackParamList";

const screenHeight = Dimensions.get("window").height;

type ChoosePlayersAmountProp = RouteProp<RootStackParamList, "ChoosePlayersAmount">;

const ChoosePlayersAmount = () => {
  const [playersAmount, setPlayersAmount] = useState('');
  const [initialBalance, setInitialBalance] = useState('');
  const navigation = useNavigation<any>();

  const route = useRoute<ChoosePlayersAmountProp>();
  const { gameType } = route.params;

  const finalPlayersAmount = playersAmount === '' ? 2 : parseInt(playersAmount, 10);


  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require("../../assets/logo.png")} style={styles.logo} />
          <Text style={styles.headerText}>
            Table configuration
          </Text>
        </View>
        <View style={styles.content}>
          <View style={{width: "100%"}}>
            <Text style={styles.title}>Amount of players</Text>
            <TextInput
              style={styles.input}
              value={playersAmount}
              onChangeText={(text) => {
                let numeric = text.replace(/\D/g, '');
                
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
              autoFocus
            />
          </View>
          <View style={{width: "100%"}}>
            <Text style={styles.title}>Initial balance</Text>
            <TextInput
              style={styles.input}
              value={initialBalance}
              onChangeText={(text) => {
                let numeric = text.replace(/\D/g, '');
                
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
              // autoFocus
            />
          </View>
         


          <TouchableOpacity
            onPress={() => {if(+playersAmount >= 2 && +initialBalance >= 100) navigation.navigate(gameType, { playersCount: finalPlayersAmount, initialBalance })}}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Start Game</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
            <Text style={styles.footerText}>2025 Stacked.</Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:
  {
    position: "absolute",
    top: "0%",
    flexDirection: "row",
    width: "100%",
    height: "20%",
    backgroundColor: "#1c1c1c",
    // borderBottomWidth: 1,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
    // borderColor: "#cbbb9c",
    zIndex: 3,
  },
  headerText:
  {
    flex: 1,
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  content:
  {
    position: "absolute",
    top: "17.5%",
    zIndex: 2,
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
    height: "70%",
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
    // borderWidth: 1,
    // borderColor: "#f7e2bd"
  },
  logo:
  {
    width: "30%",
    height: "100%",
    resizeMode: "contain"
  },
  title: {
    width: "100%",
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: "center",
  },
  input: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: '#888',
    borderRadius: 8,
    padding: 10,
    width: '35%',
    marginTop: 20,
    alignSelf: "center",
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
  footer: {
    position: "absolute",
    top: "85%",
    // borderTopWidth: 1,
    // borderTopColor: "",
    height: "15%",
    width: "100%",
    backgroundColor: '#1c1c1c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: 'gray',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ChoosePlayersAmount;
