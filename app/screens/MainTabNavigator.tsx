import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import PlayScreen from './PlayScreen';
import AcademyScreen from './AcademyScreen';
import MoreScreen from './MoreScreen';
import CheckHandScreen from './CheckHandScreen';

export default function App() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={({ route }: { route: { name: string } }) => ({
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#fff',
        tabBarStyle: { backgroundColor: '#121212', boxShadow: '0 0 24px 24px #121212', elevation: 24 },
        tabBarActiveTintColor: 'white',
        tabBarIndicatorStyle: { backgroundColor: '#cbbb9c', marginBottom: 5 },
        tabBarItemStyle: {  
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 0,
          marginHorizontal: -8, 
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName = "";
          
          if (route.name === 'Academy') iconName = 'book';
          else if(route.name === 'More') iconName = 'ellipsis-horizontal'
          else if(route.name === 'Check') iconName = "layers";
          else iconName = route.name.toLowerCase();
          
          if (!focused) iconName += '-outline';
          
          return <Icon name={iconName} color={color} size={20}/>;
        },
      })}
      >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarShowLabel: true }} />
      <Tab.Screen name="Check" component={CheckHandScreen} options={{ tabBarShowLabel: true }} />
      <Tab.Screen name="Play" component={PlayScreen} options={{ tabBarShowLabel: true}}/>
      <Tab.Screen name="Academy" component={AcademyScreen} options={{ tabBarShowLabel: true }} />
      <Tab.Screen name="More" component={MoreScreen} options={{ tabBarShowLabel: true }} />
    </Tab.Navigator>
  );
}