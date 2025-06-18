import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './WelcomeScreen';
import MainTabNavigator from './MainTabNavigator';
import PokerScreen from './screens/PokerScreen';
import BlackjackScreen from './screens/BlackjackScreen';
import RouletteScreen from './screens/RouletteScreen';
import PokerGame from './games/PokerGame';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
            height: 70,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main tabs" component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Poker Screen" component={PokerScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Poker Game" component={PokerGame} options={{ headerShown: false }} />
        <Stack.Screen name="Blackjack Screen" component={BlackjackScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Roulette Screen" component={RouletteScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
