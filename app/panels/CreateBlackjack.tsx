import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  Switch,
} from "react-native";
import { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/core";
import Toast from "react-native-toast-message";
import toastConfig from "../../config/ToastConfig";
import Ionicons from "react-native-vector-icons/Ionicons";
import HelpPopover from "../../components/HelpPopover";

const CreateBlackjack = () => {
  const [playersAmount, setPlayersAmount] = useState("");
  const [initialBalance, setInitialBalance] = useState("");
  const [mode, setMode] = useState<"tracking" | "training">("training");

  const [allowInsurance, setAllowInsurance] = useState(false);
  const [allowDouble, setAllowDouble] = useState(false);
  const [showBalanceTip, setShowBalanceTip] = useState(false);
  const trackingRef = useRef<any>(null);
  const trainingRef = useRef<any>(null);
  const insuranceRef = useRef<any>(null);
  const doubleRef = useRef<any>(null);

  const [showTrackingTip, setShowTrackingTip] = useState(false);
  const [showTrainingTip, setShowTrainingTip] = useState(false);
  const [showInsuranceTip, setShowInsuranceTip] = useState(false);
  const [showDoubleTip, setShowDoubleTip] = useState(false);

  const [autoHitOn17, setAutoHitOn17] = useState(false);
  const autoHitRef = useRef<any>(null);
  const [showAutoHitTip, setShowAutoHitTip] = useState(false);

  const balanceRef = useRef<any>(null);
  const navigation = useNavigation<any>();

  const finalPlayersAmount =
    playersAmount === "" ? 2 : parseInt(playersAmount, 10);

  const handleStart = () => {
    if (!mode) {
      Toast.show({
        type: "error",
        text1: "Select a game mode",
        text2: "Please choose Training or Table Tracking first.",
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
      return;
    }

    if (+playersAmount >= 1 && +initialBalance >= 100) {
      navigation.navigate("BlackjackGame", {
        playersCount: finalPlayersAmount,
        initialBalance,
        trainingMode: mode === "training",
        trackingEnabled: mode === "tracking",
        allowInsurance: mode === "training" ? allowInsurance : false,
        allowDouble: mode === "training" ? allowDouble : false,
        autoHitOn17: mode === "training" ? autoHitOn17 : false,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Invalid game parameters",
        text2: "Players ≥ 1   Balance ≥ 100",
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
          <Text style={styles.headerText}>Blackjack setup</Text>
        </View>

        {/* CONTENT */}
        <View style={styles.content}>
          {/* Players */}
          <View style={{ width: "100%", alignItems: "center" }}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>Players</Text>
            </View>
            <TextInput
              style={styles.input}
              value={playersAmount}
              onChangeText={(text) => {
                const numeric = text.replace(/\D/g, "");
                if (numeric === "") return setPlayersAmount("");
                const number = Math.max(1, Math.min(parseInt(numeric, 10), 7));
                setPlayersAmount(number.toString());
              }}
              keyboardType="numeric"
              placeholder="(1-7)"
              placeholderTextColor="#888"
              maxLength={1}
            />
          </View>

          {/* Balance + tooltip */}
          <View style={{ width: "100%", alignItems: "center" }}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>Balance</Text>
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
              text="Initial money per player"
            />
            <TextInput
              style={styles.input}
              value={initialBalance}
              onChangeText={(text) => {
                const numeric = text.replace(/\D/g, "");
                if (numeric === "") return setInitialBalance("");
                const number = Math.max(
                  100,
                  Math.min(parseInt(numeric, 10), 100000)
                );
                setInitialBalance(number.toString());
              }}
              keyboardType="numeric"
              placeholder="(100-100k)"
              placeholderTextColor="#888"
              maxLength={5}
            />
          </View>

          <View style={styles.radioGroup}>
            {/* Training Mode */}
            <TouchableOpacity
              onPress={() => setMode("training")}
              style={styles.radioOption}
            >
              <Ionicons
                name={
                  mode === "training" ? "radio-button-on" : "radio-button-off"
                }
                size={20}
                color="#cbbb9c"
              />
              <Text style={styles.radioLabel}>Training mode</Text>
              <TouchableOpacity
                ref={trainingRef}
                onPress={() => setShowTrainingTip(true)}
              >
                <View style={styles.iconWrapper}>
                  <Ionicons name="help-circle" size={20} color="#cbbb9c" />
                </View>
              </TouchableOpacity>
              <HelpPopover
                isVisible={showTrainingTip}
                from={trainingRef}
                onRequestClose={() => setShowTrainingTip(false)}
                text="No chips, pure card gameplay – perfect for learning blackjack basics."
              />
            </TouchableOpacity>

            {/* Table Tracking */}
            <TouchableOpacity
              onPress={() => setMode("tracking")}
              style={styles.radioOption}
            >
              <Ionicons
                name={
                  mode === "tracking" ? "radio-button-on" : "radio-button-off"
                }
                size={20}
                color="#cbbb9c"
              />
              <Text style={styles.radioLabel}>Table tracking mode</Text>
              <TouchableOpacity
                ref={trackingRef}
                onPress={() => setShowTrackingTip(true)}
              >
                <View style={styles.iconWrapper}>
                  <Ionicons name="help-circle" size={20} color="#cbbb9c" />
                </View>
              </TouchableOpacity>
              <HelpPopover
                isVisible={showTrackingTip}
                from={trackingRef}
                onRequestClose={() => setShowTrackingTip(false)}
                text="Track win/loss and chip flow at the table."
              />
            </TouchableOpacity>
          </View>

          {/* Conditional options */}
          {mode === "training" && (
            <>
              <View style={styles.switchRow}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.title}>Allow insurance</Text>
                  <TouchableOpacity
                    ref={insuranceRef}
                    onPress={() => setShowInsuranceTip(true)}
                  >
                    <View style={styles.iconWrapper}>
                      <Ionicons name="help-circle" size={20} color="#cbbb9c" />
                    </View>
                  </TouchableOpacity>
                  <HelpPopover
                    isVisible={showInsuranceTip}
                    from={insuranceRef}
                    onRequestClose={() => setShowInsuranceTip(false)}
                    text="Side bet protecting against dealer's blackjack."
                  />
                </View>
                <Switch
                  value={allowInsurance}
                  onValueChange={setAllowInsurance}
                />
              </View>

              <View style={styles.switchRow}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.title}>Allow double</Text>
                  <TouchableOpacity
                    ref={doubleRef}
                    onPress={() => setShowDoubleTip(true)}
                  >
                    <View style={styles.iconWrapper}>
                      <Ionicons name="help-circle" size={20} color="#cbbb9c" />
                    </View>
                  </TouchableOpacity>
                  <HelpPopover
                    isVisible={showDoubleTip}
                    from={doubleRef}
                    onRequestClose={() => setShowDoubleTip(false)}
                    text="Double your initial bet and receive one final card."
                  ></HelpPopover>
                </View>
                <Switch value={allowDouble} onValueChange={setAllowDouble} />
              </View>

              <View style={styles.switchRow}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.title}>Auto-hit on 17</Text>
                  <TouchableOpacity
                    ref={autoHitRef}
                    onPress={() => setShowAutoHitTip(true)}
                  >
                    <View style={styles.iconWrapper}>
                      <Ionicons name="help-circle" size={20} color="#cbbb9c" />
                    </View>
                  </TouchableOpacity>
                  <HelpPopover
                    isVisible={showAutoHitTip}
                    from={autoHitRef}
                    onRequestClose={() => setShowAutoHitTip(false)}
                    text="Automatically draw cards to soft 17 in training games (dealer behavior simulation)."
                  />
                </View>
                <Switch value={autoHitOn17} onValueChange={setAutoHitOn17} />
              </View>
            </>
          )}

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
  switchRow: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
  },
  header: {
    height: "20%",
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
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#1c1c1c",
    paddingTop: 10,
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
  footer: {
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
  },
  footerText: {
    color: "gray",
    fontSize: 16,
  },
  radioGroup: {
    width: "90%",
    flexDirection: "column",
    marginTop: 20,
    // justifyContent: "space-around",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  radioLabel: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
});

export default CreateBlackjack;
