import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  Pressable,
  StyleSheet
} from "react-native";
import { Component, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import RootStackParamList from "../../props/RootStackParamList";
import Toast from "react-native-toast-message";
import toastConfig from "../../config/ToastConfig";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Popover from 'react-native-popover-view';
import { useRef } from 'react';
import { PopoverPlacement } from 'react-native-popover-view';
import { Touchable } from "react-native";


type ChoosePlayersAmountProp = RouteProp<RootStackParamList, "ChoosePlayersAmount">;

const ChoosePlayersAmount = () => {
  const [playersAmount, setPlayersAmount] = useState('');
  const [initialBalance, setInitialBalance] = useState('');
  const [selectedBigBlind, setSelectedBigBlind] = useState<number | null>(null);
  const [selectedSmallBlind, setSelectedSmallBlind] = useState<number | null>(null);
  const [showBalanceTip, setShowBalanceTip] = useState(false);
  const [showBigBlindTip, setShowBigBlindTip] = useState(false);
  const [showSmallBlindTip, setShowSmallBlindTip] = useState(false);

  const balanceRef = useRef<any>(null);  
  const bigBlindRef = useRef<any>(null);
  const smallBlindRef = useRef<any>(null);

  const navigation = useNavigation<any>();
  const route = useRoute<ChoosePlayersAmountProp>();
  const { gameType } = route.params;

  const finalPlayersAmount = playersAmount === '' ? 2 : parseInt(playersAmount, 10);

  const smallBlindsData = [
    { id: 0, value: 1 },
    { id: 1, value: 2 },
    { id: 2, value: 5 },
    { id: 3, value: 10 },
    { id: 4, value: 20 },
  ];

  const bigBlindsData = [
    { id: 0, value: 2 },
    { id: 1, value: 5 },
    { id: 2, value: 10 },
    { id: 3, value: 20 },
    { id: 4, value: 50 },
  ];

  const handleStart = () => {
    if (+playersAmount >= 2 && +initialBalance >= 100)
      navigation.navigate(gameType, {
        playersCount: finalPlayersAmount,
        initialBalance,
        bigBlind: bigBlindsData.find(i => i.id === selectedBigBlind)?.value,
        smallBlind: smallBlindsData.find(i => i.id === selectedSmallBlind)?.value
      });
    else {
      Toast.show({
        type: 'error',
        text1: 'Invalid game parameters',
        text2: 'Players ≥ 2\t Balance ≥ 100',
        position: 'top',
        text1Style: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#cbbb9c',
          textAlign: "left"
        },
        text2Style: { fontSize: 12, color: 'gray' },
        swipeable: true
      });
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={require('../../assets/arrowRight.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Table setup</Text>
        </View>

        {/* CONTENT */}
        <View style={styles.content}>
          {/* Players (bez tooltipa) */}
          <View style={{ width: "100%", alignItems: "center" }}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>Players</Text>
            </View>
            <TextInput
              style={styles.input}
              value={playersAmount}
              onChangeText={(text) => {
                const numeric = text.replace(/\D/g, '');
                if (numeric === '') return setPlayersAmount('');
                let number = Math.max(1, Math.min(parseInt(numeric, 10), 12));
                setPlayersAmount(number.toString());
              }}
              keyboardType="numeric"
              placeholder="Select number between 2 and 12"
              placeholderTextColor="#888"
              maxLength={2}
            />
          </View>

          {/* Balance + tooltip */}
          <View style={{ width: "100%", alignItems: "center" }}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Balance</Text>
            <TouchableOpacity ref={balanceRef} onPress={() => setShowBalanceTip(true)}>
              <View style={styles.iconWrapper}>
                <Ionicons name="help-circle" size={20} color="#cbbb9c" />
              </View>
            </TouchableOpacity>
          </View>
          <Popover
            popoverStyle={{backgroundColor: "#cbbb9c"}}
            isVisible={showBalanceTip}
            from={balanceRef}
            onRequestClose={() => setShowBalanceTip(false)}
            placement={PopoverPlacement.TOP}
            arrowSize={{ width: 10, height: 6 }}
            backgroundStyle={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
          >
            <View style={{  backgroundColor: "#1c1c1c", padding: 10,  borderWidth: 3, borderColor: "#cbbb9c", borderRadius: 5 }}>
              <Text style={{ color: "#fff" }}>Initial amount of money per player</Text>
            </View>
          </Popover>
          <TextInput
            style={styles.input}
            value={initialBalance}
            onChangeText={(text) => {
              const numeric = text.replace(/\D/g, '');
              if (numeric === '') return setInitialBalance('');
              let number = Math.max(1, Math.min(parseInt(numeric, 10), 100000));
              setInitialBalance(number.toString());
            }}
            keyboardType="numeric"
            placeholder="Select number between 100 and 100k"
            placeholderTextColor="#888"
            maxLength={5}
          />
        </View>


          {/* Big blind */}
         <View style={styles.titleRow}>
            <Text style={styles.title}>Big blind</Text>
            <TouchableOpacity ref={bigBlindRef} onPress={() => setShowBigBlindTip(true)}>
              <View style={styles.iconWrapper}>
                <Ionicons name="help-circle" size={20} color="#cbbb9c" />
              </View>
            </TouchableOpacity>
          </View>
          <Popover
            popoverStyle={{backgroundColor: "#cbbb9c"}}
            isVisible={showBigBlindTip}
            from={bigBlindRef}
            onRequestClose={() => setShowBigBlindTip(false)}
            placement={PopoverPlacement.TOP}
            arrowSize={{ width: 10, height: 6 }}
            backgroundStyle={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
          >
            <View style={{  backgroundColor: "#1c1c1c", padding: 10,  borderWidth: 3, borderColor: "#cbbb9c", borderRadius: 5 }}>
              <Text style={{ color: "#fff" }}>Mandatory bet from the player left to dealer</Text>
            </View>
          </Popover>
          <View style={{ width: "90%", flexDirection: "row" }}>
            {bigBlindsData.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => setSelectedBigBlind(item.id)}
                style={[
                  styles.blindItem,
                  selectedBigBlind === item.id && styles.blindItemSelected
                ]}
              >
                <Text style={{ textAlign: "center" }}>{item.value}</Text>
              </Pressable>
            ))}
          </View>
          
          {/* Small blind */}
         <View style={styles.titleRow}>
          <Text style={styles.title}>Small blind</Text>
          <TouchableOpacity ref={smallBlindRef} onPress={() => setShowSmallBlindTip(true)}>
            <View style={styles.iconWrapper}>
              <Ionicons name="help-circle" size={20} color="#cbbb9c" />
            </View>
          </TouchableOpacity>
        </View>
        <Popover
          popoverStyle={{backgroundColor: "#cbbb9c"}}
          isVisible={showSmallBlindTip}
          from={smallBlindRef}
          onRequestClose={() => setShowSmallBlindTip(false)}
          placement={PopoverPlacement.TOP}
          arrowSize={{ width: 10, height: 6 }}
          backgroundStyle={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
        >
          <View style={{ backgroundColor: "#1c1c1c", padding: 10,  borderWidth: 3, borderColor: "#cbbb9c", borderRadius: 5 }}>
            <Text style={{ color: "#fff", textAlign: "center" }}>Smaller forced bet before dealing cards</Text>
          </View>
        </Popover>
        <View style={{ width: "90%", flexDirection: "row" }}>
          {smallBlindsData.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => setSelectedSmallBlind(item.id)}
              style={[
                styles.blindItem,
                selectedSmallBlind === item.id && styles.blindItemSelected
              ]}
            >
              <Text style={{ textAlign: "center" }}>{item.value}</Text>
            </Pressable>
          ))}
        </View>


          {/* START BUTTON */}
          <TouchableOpacity onPress={handleStart} style={styles.button}>
            <Text style={styles.buttonText}>Start Game</Text>
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>2025 Stacked.</Text>
        </View>
      </SafeAreaView>
      <Toast config={toastConfig} />
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
    justifyContent: 'space-between',
    backgroundColor: '#1c1c1c',
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    marginTop: 20,
    paddingHorizontal: "5%",
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconWrapper: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 6,
  },
  input: {
    width: "90%",
    color: 'white',
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#cbbb9c",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    width: "90%",
    marginTop: 30,
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cbbb9c",
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
    textAlign: "center",
  },
  blindItem: {
    backgroundColor: "#cbbb9c",
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  blindItemSelected: {
    // borderWidth: 2,
    // borderColor: "white",
    backgroundColor: "gray"
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
