import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/core";
import Toast from "react-native-toast-message";
import toastConfig from "../../config/ToastConfig";
import Ionicons from "react-native-vector-icons/Ionicons";
import HelpPopover from "../../components/HelpPopover";
import * as Animatable from "react-native-animatable";
import { useLanguage } from "../../hooks/useLanguage";

const CreatePoker = () => {
  const { language } = useLanguage();
  const [playersAmount, setPlayersAmount] = useState("");
  const [initialBalance, setInitialBalance] = useState("");
  const [selectedBigBlind, setSelectedBigBlind] = useState<number | null>(null);
  const [selectedSmallBlind, setSelectedSmallBlind] = useState<number | null>(
    null
  );
  const [showBalanceTip, setShowBalanceTip] = useState(false);
  const [showBigBlindTip, setShowBigBlindTip] = useState(false);
  const [showSmallBlindTip, setShowSmallBlindTip] = useState(false);

  const balanceRef = useRef<any>(null);
  const bigBlindRef = useRef<any>(null);
  const smallBlindRef = useRef<any>(null);

  const navigation = useNavigation<any>();

  const finalPlayersAmount =
    playersAmount === "" ? 2 : parseInt(playersAmount, 10);

  const smallBlindsData = [1, 2, 5, 10, 20];
  const bigBlindsData = [2, 5, 10, 20, 50];

  const handleStart = () => {
    if (+playersAmount >= 2 && +initialBalance >= 100)
      navigation.navigate("PokerGame", {
        playersCount: finalPlayersAmount,
        initialBalance,
        bigBlindAmount: bigBlindsData[selectedBigBlind ?? 0],
        smallBlindAmount: smallBlindsData[selectedSmallBlind ?? 0],
      });
    else {
      Toast.show({
        type: "error",
        text1:
          language === "pl"
            ? "Nieprawidłowe parametry gry"
            : "Invalid game parameters",
        text2:
          language === "pl"
            ? "Gracze ≥ 2\t Saldo ≥ 100"
            : "Players ≥ 2\t Balance ≥ 100",
        position: "top",
        text1Style: {
          fontSize: 20,
          fontWeight: "bold",
          color: "#cbbb9c",
          textAlign: "left",
        },
        text2Style: { fontSize: 12, color: "gray" },
        swipeable: true,
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Image
                source={require("../../assets/arrowRight.png")}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>
              {language === "pl" ? "Konfiguracja pokera" : "Poker setup"}
            </Text>
          </View>

          {/* CONTENT */}
          <View style={styles.content}>
            {/* Players (bez tooltipa) */}
            <Animatable.View
              style={{ width: "100%", alignItems: "center" }}
              animation="fadeIn"
              duration={1000}
              delay={100}
            >
              <View style={styles.titleRow}>
                <Text style={styles.title}>
                  {language === "pl" ? "Gracze" : "Players"}
                </Text>
              </View>
              <TextInput
                style={styles.input}
                value={playersAmount}
                onChangeText={(text) => {
                  const numeric = text.replace(/\D/g, "");
                  if (numeric === "") return setPlayersAmount("");
                  let number = Math.max(1, Math.min(parseInt(numeric, 10), 12));
                  setPlayersAmount(number.toString());
                }}
                keyboardType="numeric"
                placeholder="(2-12)"
                placeholderTextColor="#888"
                maxLength={2}
              />
            </Animatable.View>

            {/* Balance + tooltip */}
            <Animatable.View
              style={{ width: "100%", alignItems: "center" }}
              animation="fadeIn"
              duration={1000}
              delay={200}
            >
              <View style={styles.titleRow}>
                <Text style={styles.title}>
                  {language === "pl" ? "Saldo" : "Balance"}
                </Text>
                <TouchableOpacity
                  ref={balanceRef}
                  onPress={() => setShowBalanceTip(true)}
                >
                  <View style={styles.iconWrapper}>
                    <Ionicons name="help-circle" size={20} color="#cbbb9c" />
                  </View>
                </TouchableOpacity>
              </View>
              <HelpPopover
                isVisible={showBalanceTip}
                from={balanceRef}
                onRequestClose={() => setShowBalanceTip(false)}
                text={
                  language === "pl"
                    ? "Początkowa ilość żetonów każdego gracza"
                    : "Initial amount of money per player"
                }
              />
              <TextInput
                style={styles.input}
                value={initialBalance}
                onChangeText={(text) => {
                  const numeric = text.replace(/\D/g, "");
                  if (numeric === "") return setInitialBalance("");
                  let number = Math.max(
                    1,
                    Math.min(parseInt(numeric, 10), 100000)
                  );
                  setInitialBalance(number.toString());
                }}
                keyboardType="numeric"
                placeholder="(100-100k)"
                placeholderTextColor="#888"
                maxLength={5}
              />
            </Animatable.View>

            {/* Big blind */}
            <Animatable.View
              style={styles.titleRow}
              animation="fadeIn"
              duration={1000}
              delay={300}
            >
              <Text style={styles.title}>Big blind</Text>
              <TouchableOpacity
                ref={bigBlindRef}
                onPress={() => setShowBigBlindTip(true)}
              >
                <View style={styles.iconWrapper}>
                  <Ionicons name="help-circle" size={20} color="#cbbb9c" />
                </View>
              </TouchableOpacity>
              <HelpPopover
                isVisible={showBigBlindTip}
                from={bigBlindRef}
                onRequestClose={() => setShowBigBlindTip(false)}
                text={
                  language === "pl"
                    ? "Obowiązkowy zakład od gracza po lewej stronie rozdającego"
                    : "Mandatory bet from the player left to dealer"
                }
              />
            </Animatable.View>
            <Animatable.View
              style={{ width: "90%", flexDirection: "row" }}
              animation="fadeIn"
              duration={1000}
              delay={300}
            >
              {bigBlindsData.map((value, i) => (
                <TouchableHighlight
                  key={i + 1}
                  onPress={() => setSelectedBigBlind(i)}
                  style={[
                    styles.blindItem,
                    selectedBigBlind === i && styles.blindItemSelected,
                  ]}
                  underlayColor="#948870"
                >
                  <Text style={{ textAlign: "center" }}>{value}</Text>
                </TouchableHighlight>
              ))}
            </Animatable.View>

            {/* Small blind */}
            <Animatable.View
              style={styles.titleRow}
              animation="fadeIn"
              duration={1000}
              delay={400}
            >
              <Text style={styles.title}>Small blind</Text>
              <TouchableOpacity
                ref={smallBlindRef}
                onPress={() => setShowSmallBlindTip(true)}
              >
                <View style={styles.iconWrapper}>
                  <Ionicons name="help-circle" size={20} color="#cbbb9c" />
                </View>
              </TouchableOpacity>
              <HelpPopover
                isVisible={showSmallBlindTip}
                from={smallBlindRef}
                onRequestClose={() => setShowSmallBlindTip(false)}
                text={
                  language === "pl"
                    ? "Obowiązkowy mniejszy zakład przed rozdaniem kart"
                    : "Smaller forced bet before dealing cards"
                }
              />
            </Animatable.View>
            <Animatable.View
              style={{ width: "90%", flexDirection: "row" }}
              animation="fadeIn"
              duration={1000}
              delay={400}
            >
              {smallBlindsData.map((value, i) => (
                <TouchableHighlight
                  key={i + 1}
                  onPress={() => setSelectedSmallBlind(i)}
                  style={[
                    styles.blindItem,
                    selectedSmallBlind === i && styles.blindItemSelected,
                  ]}
                  underlayColor="#948870"
                >
                  <Text style={{ textAlign: "center" }}>{value}</Text>
                </TouchableHighlight>
              ))}
            </Animatable.View>

            {/* START BUTTON */}
            <Animatable.View
              style={{ width: "100%", alignItems: "center" }}
              animation="fadeIn"
              duration={1000}
              delay={500}
            >
              <TouchableOpacity onPress={handleStart} style={styles.button}>
                <Text style={styles.buttonText}>
                  {language === "pl" ? "Rozpocznij grę" : "Start Game"}
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>2025 Stacked.</Text>
          </View>
        </SafeAreaView>
        <Toast config={toastConfig} swipeable />
      </SafeAreaProvider>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#1c1c1c",
  },
  header: {
    height: "20%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#1c1c1c",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    width: 20,
    height: 20,
    transform: [{ scaleX: -1 }],
  },
  headerText: {
    width: "80%",
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    height: "60%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1c1c1c",
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
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
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
    color: "white",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#cbbb9c",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    width: "90%",
    marginTop: 30,
    backgroundColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cbbb9c",
  },
  buttonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "600",
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
    outlineWidth: 2.5,
    outlineColor: "white",
  },
  footer: {
    height: "20%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
  },
  footerText: {
    color: "gray",
    fontSize: 16,
  },
});

export default CreatePoker;
