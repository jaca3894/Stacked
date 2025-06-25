import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import PlayScreen from './PlayScreen';
import AcademyScreen from './AcademyScreen';
import MoreScreen from './MoreScreen';
import { Dimensions } from 'react-native';

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
        tabBarItemStyle: { width: Dimensions.get('window').width / 4 },
        tabBarIcon: ({ focused, color }) => {
          let iconName = "";
          
          if (route.name === 'Academy') iconName = 'book';
          else if(route.name === 'More') iconName = 'ellipsis-horizontal'
          else iconName = route.name.toLowerCase();
          
          if (!focused) iconName += '-outline';
          
          return <Icon name={iconName} color={color} size={20}/>;
        },
      })}
      >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarShowLabel: true }} />
      <Tab.Screen name="Play" component={PlayScreen} options={{ tabBarShowLabel: true }} />
      <Tab.Screen name="Academy" component={AcademyScreen} options={{ tabBarShowLabel: true }} />
      <Tab.Screen name="More" component={MoreScreen} options={{ tabBarShowLabel: true }} />
    </Tab.Navigator>
  );
}