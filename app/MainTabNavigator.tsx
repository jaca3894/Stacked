import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import PlayScreen from './PlayScreen';
import LearningScreen from './LearningScreen';

export default function App() {

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: 'black' },
        headerTintColor: '#fff',
        tabBarStyle: { backgroundColor: 'black' },
        tabBarActiveTintColor: 'white',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";

          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Play') iconName = focused ? 'play' : 'play-outline';
          else if (route.name === 'Learn')iconName = focused ? 'book' : 'book-outline';
        
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false, tabBarShowLabel: true }} />
      <Tab.Screen name="Play" component={PlayScreen} options={{ headerShown: false, tabBarShowLabel: true }} />
      <Tab.Screen name="Learn" component={LearningScreen} options={{ headerShown: false, tabBarShowLabel: true }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
