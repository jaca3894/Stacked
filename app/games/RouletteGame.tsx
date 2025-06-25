import { RouteProp, useRoute } from "@react-navigation/core";
import { View, Text } from "react-native";
import RootStackParamList from "../../props/RootStackParamList";

type GameRouteProp = RouteProp<RootStackParamList, "Game">;

const RouletteGame = () => {
  const route = useRoute<GameRouteProp>();
  const { playersCount } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: '#1c1c1c', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'white', fontSize: 24 }}>{playersCount}</Text>
      <Text style={{ color: 'white', fontSize: 24 }}>Roulette Game</Text>
      {/* Add your roulette game logic and UI here */}
    </View>
  );
}

export default RouletteGame;