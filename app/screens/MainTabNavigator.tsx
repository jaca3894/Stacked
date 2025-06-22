import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import PlayScreen from './PlayScreen';
import LearningScreen from './LearningScreen';
import MoreScreen from './MoreScreen';

export default function App() {

  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={({ route }: { route: { name: string } }) => ({
      headerStyle: { backgroundColor: '#1c1c1c' },
      headerTintColor: '#fff',
      tabBarStyle: { backgroundColor: '#1c1c1c' },
      tabBarActiveTintColor: 'white',
      tabBarIndicatorStyle: { backgroundColor: '#cbbb9c' },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      tabBarIcon: ({ focused, color }) => {
        let iconName = "";

        if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
        else if (route.name === 'Play') iconName = focused ? 'play' : 'play-outline';
        else if (route.name === 'Academy') iconName = focused ? 'book' : 'book-outline';
        else if (route.name === 'More') iconName = focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline';

        return <Icon name={iconName} color={color} size={20}/>;
      },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarShowLabel: true }} />
      <Tab.Screen name="Play" component={PlayScreen} options={{ tabBarShowLabel: true }} />
      <Tab.Screen name="Academy" component={LearningScreen} options={{ tabBarShowLabel: true }} />
      <Tab.Screen name="More" component={MoreScreen} options={{ tabBarShowLabel: true }} />
    </Tab.Navigator>
  );
}