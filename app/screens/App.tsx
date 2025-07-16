import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import WelcomeScreen from "./WelcomeScreen";
import MainTabNavigator from "./MainTabNavigator";
import CreatePoker from "../panels/CreatePoker";
import CreateBlackjack from "../panels/CreateBlackjack";
import PokerGame from "../games/PokerGame";
import BlackjackGame from "../games/BlackjackGame";
import BlackjackTraining from "../games/BlackjackTraining";
import ArticleScreen from "./ArticleScreen";
import SettingsScreen from "./More/Settings";
import CreditsScreen from "./More/Credits";
import FeedbackScreen from "./More/Feedback";
import GlossaryScreen from "./More/Glossary";
import PatchNotesScreen from "./More/PatchNotes";
import ReportBugScreen from "./More/ReportBug";
import SavesScreen from "./SavesScreen";

const Stack = createStackNavigator();

export default function App() {
  const [showWelcome, setShowWelcome] = useState<boolean | null>(null);

  useEffect(() => {
    const initializeLanguage = async () => {
      const current = await AsyncStorage.getItem("@language");
      if (current !== "pl" && current !== "eng") {
        await AsyncStorage.setItem("@language", "eng"); // domyślny język
      }
    };
    initializeLanguage();
  }, []);

  useEffect(() => {
    // AsyncStorage.clear();
    const checkFlag = async () => {
      if (__DEV__) {
        setShowWelcome(false); // true wyswietli welcome
        return;
      }

      const seen = await AsyncStorage.getItem("@hasSeenWelcome");
      setShowWelcome(!seen);
    };

    checkFlag();
  }, []);

  if (showWelcome === null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1c1c1c",
        }}
      >
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    // <CopilotProvider
    //   tooltipComponent={Tooltip}
    //   tooltipStyle={{ backgroundColor: "transparent" }}
    //   arrowColor="transparent"
    //   // verticalOffset={10}
    //   // arrowSize={28}
    //   stepNumberComponent={EmptyStepNumber}
    //   overlay="view"
    //   backdropColor="rgba(0, 0, 0, 0.85)"
    // >
    <View style={{ flex: 1, backgroundColor: "#1c1c1c" }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={showWelcome ? "Welcome" : "MainTabs"}
          screenOptions={{
            headerStyle: { backgroundColor: "black", height: 70 },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
            cardStyle: { backgroundColor: "black" },
          }}
        >
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainTabs"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreatePoker"
            component={CreatePoker}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateBlackjack"
            component={CreateBlackjack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PokerGame"
            component={PokerGame}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BlackjackGame"
            component={BlackjackGame}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BlackjackTraining"
            component={BlackjackTraining}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Article"
            component={ArticleScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Credits"
            component={CreditsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Feedback"
            component={FeedbackScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Glossary"
            component={GlossaryScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PatchNotes"
            component={PatchNotesScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ReportBug"
            component={ReportBugScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Saves"
            component={SavesScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
    // </CopilotProvider>
  );
}
