import { StyleSheet, Text } from "react-native";
import { View } from "react-native-animatable";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const SettingsScreen = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={{ color: "#fff" }}>Settings</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
  },
});

export default SettingsScreen;
