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
import ArticleScreen from "./ArticleScreen";

const Stack = createStackNavigator();

export default function App() {
  const [showWelcome, setShowWelcome] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFlag = async () => {
      if (__DEV__) {
        setShowWelcome(false);
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
            name="Article"
            component={ArticleScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
