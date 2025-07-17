import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from "./Main/HomeScreen";
import PlayScreen from "./Main/PlayScreen";
import AcademyScreen from "./Main/AcademyScreen";
import MoreScreen from "./Main/MoreScreen";
import CheckHandScreen from "./Main/CheckHandScreen";
import { useLanguage } from "../../hooks/useLanguage";

export default function App() {
  const Tab = createMaterialTopTabNavigator();
  const { language } = useLanguage();

  return (
    <Tab.Navigator
      initialRouteName={language === "pl" ? "Start" : "Home"}
      tabBarPosition="bottom"
      screenOptions={({ route }: { route: { name: string } }) => ({
        headerStyle: { backgroundColor: "#121212" },
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#121212",
          boxShadow: "0 0 24px 24px #121212",
          elevation: 24,
        },
        tabBarActiveTintColor: "white",
        tabBarIndicatorStyle: { backgroundColor: "#cbbb9c", marginBottom: 5 },
        tabBarItemStyle: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 0,
          marginHorizontal: -8,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName = "";

          if (route.name === (language === "pl" ? "Academy" : "Academy"))
            iconName = "book";
          else if (route.name === (language === "pl" ? "Więcej" : "More"))
            iconName = "ellipsis-horizontal";
          else if (route.name === (language === "pl" ? "Układ" : "Check"))
            iconName = "layers";
          else if (route.name === (language === "pl" ? "Start" : "Home"))
            iconName = "home";
          else if (route.name === (language === "pl" ? "Graj" : "Play"))
            iconName = "play";
          else iconName = route.name.toLowerCase();

          if (!focused) iconName += "-outline";

          return <Icon name={iconName} color={color} size={20} />;
        },
      })}
    >
      <Tab.Screen
        name={language === "pl" ? "Start" : "Home"}
        component={HomeScreen}
        options={{ tabBarShowLabel: true }}
      />
      <Tab.Screen
        name={language === "pl" ? "Układ" : "Check"}
        component={CheckHandScreen}
        options={{ tabBarShowLabel: true }}
      />
      <Tab.Screen
        name={language === "pl" ? "Graj" : "Play"}
        component={PlayScreen}
        options={{ tabBarShowLabel: true }}
      />
      <Tab.Screen
        name="Academy"
        component={AcademyScreen}
        options={{ tabBarShowLabel: true }}
      />
      <Tab.Screen
        name={language === "pl" ? "Więcej" : "More"}
        component={MoreScreen}
        options={{ tabBarShowLabel: true }}
      />
    </Tab.Navigator>
  );
}
