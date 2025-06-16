import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import LearningScreen from './LearningScreen';
import PlayScreen from './PlayScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
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
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Learn" component={LearningScreen} options={{ title: 'Logowanie' }} />
        <Stack.Screen name="Play" component={PlayScreen} options={{ title: 'Rejestracja' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
