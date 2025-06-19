import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './WelcomeScreen';
import MainTabNavigator from './MainTabNavigator';
import ChoosePlayersAmount from './screens/ChoosePlayersAmount';
import PokerGame from './games/PokerGame';
import BlackjackGame from './games/BlackjackGame';
import RouletteGame from './games/RouletteGame';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: '#1c1c1c' }}>
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
            cardStyle: {
              backgroundColor: 'black', // <-- to dodaj
            },
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MainTabs" component={MainTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="ChoosePlayersAmount" component={ChoosePlayersAmount} options={{ headerShown: false }} />
          <Stack.Screen name="PokerGame" component={PokerGame} options={{ headerShown: false }} />
          <Stack.Screen name="BlackjackGame" component={BlackjackGame} options={{ headerShown: false }} />
          <Stack.Screen name="RouletteGame" component={RouletteGame} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
