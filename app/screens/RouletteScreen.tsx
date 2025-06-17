import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";

const RouletteScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1c1c1c', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>Roulette</Text>
    </SafeAreaView>
  )
};

export default RouletteScreen;