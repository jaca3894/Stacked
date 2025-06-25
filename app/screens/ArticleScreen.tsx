import { View, Text } from "react-native";

const ArticleScreen = () => {
  return (
    <View>
        <View style={{ flex: 1, backgroundColor: '#1c1c1c', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#cbbb9c', fontSize: 24, fontWeight: 'bold' }}>Article Screen</Text>
        </View>
    </View>
  );
}

export default ArticleScreen;