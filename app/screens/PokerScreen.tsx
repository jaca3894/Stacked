import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";

const PokerScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1c1c1c', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>Poker</Text>
    </SafeAreaView>
  )
};

export default PokerScreen;