import React from "react";
import {
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { withCopilotProvider } from "../../../utils/WithCopilotProvider";
import {
  CopilotProvider,
  CopilotStep,
  walkthroughable,
} from "react-native-copilot";
import { useCopilot } from "react-native-copilot";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRef } from "react";

const CopilotView = walkthroughable(View);

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const PlayScreen = () => {
  const navigation = useNavigation();
  const { start } = useCopilot();

  const hasStartedTutorial = useRef(false);

  useFocusEffect(
    React.useCallback(() => {
      const checkTutorialFlag = async () => {
        try {
          const hasSeen = await AsyncStorage.getItem("@hasSeenPlayTutorial");
          // await AsyncStorage.clear(); // to zakomentowac jesli nie testujesz
          // console.log(hasSeen);
          if (!hasSeen && !hasStartedTutorial.current) {
            hasStartedTutorial.current = true;

            // Odpalamy tutorial z opóźnieniem
            const timer = setTimeout(() => {
              start();
              AsyncStorage.setItem("@hasSeenPlayTutorial", "true");
            }, 500);

            return () => clearTimeout(timer);
          }
        } catch (error) {
          console.error("Error checking tutorial flag.", error);
        }
      };

      // ma byc !dev jesli production ready
      if (!__DEV__) {
        checkTutorialFlag();
      }

      // return () => {}; // cleanup (opcjonalny)
    }, [start])
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../../../assets/logo/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.content}>
          <View style={styles.mainContainer}>
            <Text style={styles.title}>
              What do you want to{"\n"}track today?
            </Text>
            <CopilotStep
              order={1}
              text="There it is, the heart of our app. Table tracking for Poker (Blackjack has one too). Check this out!"
              name="dealerHeart"
            >
              <CopilotView>
                <TouchableHighlight
                  style={styles.button}
                  onPress={() => (navigation as any).navigate("CreatePoker")}
                >
                  <View style={styles.buttonView}>
                    <Text style={styles.buttonText}>Poker</Text>
                    <Image
                      style={styles.arrow}
                      source={require("../../../assets/arrowRight.png")}
                      resizeMode="cover"
                    />
                  </View>
                </TouchableHighlight>
              </CopilotView>
            </CopilotStep>

            <CopilotStep
              order={2}
              name="dealerExplain"
              text="Additionally, besides tracking for Blackjack, You can play basic game with me as a Dealer."
            >
              <CopilotView>
                <TouchableHighlight
                  style={styles.button}
                  onPress={() =>
                    (navigation as any).navigate("CreateBlackjack")
                  }
                >
                  <View style={styles.buttonView}>
                    <Text style={styles.buttonText}>Blackjack</Text>
                    <Image
                      style={styles.arrow}
                      source={require("../../../assets/arrowRight.png")}
                      resizeMode="cover"
                    />
                  </View>
                </TouchableHighlight>
              </CopilotView>
            </CopilotStep>

            {/* <TouchableHighlight
              style={styles.button}
              onPress={() => (navigation as any).navigate('ChoosePlayersAmount', { gameType: 'RouletteGame' })}
            >
              <View style={styles.buttonView}>
                <Text style={styles.buttonText}>Roulette</Text>
                <Image style={styles.arrow} source={require('../../assets/arrowRight.png')} resizeMode="cover" />
              </View>
            </TouchableHighlight> */}
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
    backgroundColor: "#1c1c1c",
  },
  content: {
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: [{ translateX: "-50%" }],
  },
  logo: {
    width: screenWidth * 0.35,
    height: screenWidth * 0.35,
    marginHorizontal: "auto",
  },
  mainContainer: {
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginVertical: 8,
    width: screenWidth * 0.7,
  },
  buttonView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  arrow: {
    height: 25,
    width: 25,
  },
  footerText: {
    color: "gray",
    textAlign: "center",
    fontSize: 16,
  },
});

export default withCopilotProvider(PlayScreen);
