import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";

const BlackjackScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1c1c1c', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>Blackjack</Text>
    </SafeAreaView>
  )
};

export default BlackjackScreen;