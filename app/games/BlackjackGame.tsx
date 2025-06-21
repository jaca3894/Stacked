import { useRoute } from "@react-navigation/core";
import { View, Text } from "react-native";

import GameRouteProp from "../../props/GameProps";

const BlackjackGame = () => {
  const route = useRoute<GameRouteProp>();
  const { playersCount } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: '#1c1c1c', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'white', fontSize: 24 }}>Blackjack Game</Text>
      <Text style={{ color: 'gray', fontSize: 16 }}>{playersCount}</Text>
      {/* Add your roulette game logic and UI here */}
    </View>
  );
}

export default BlackjackGame;