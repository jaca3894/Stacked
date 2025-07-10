import { Button, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  CopilotProvider,
  CopilotStep,
  walkthroughable,
} from "react-native-copilot";
import { useCopilot } from "react-native-copilot";

const CopilotText = walkthroughable(Text);
const CopilotView = walkthroughable(View);

const SettingsScreen = () => {
  const { start } = useCopilot();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
          <Button title="Start tutorial" onPress={() => start()} />
          <CopilotStep
            text="This is a hello world example!"
            order={1}
            name="hello"
          >
            <CopilotView style={{ width: "100%", height: 300 }}>
              <CopilotText style={{ color: "#fff" }}>Settings</CopilotText>
              <CopilotText style={{ color: "#fff" }}>dddd</CopilotText>
            </CopilotView>
          </CopilotStep>
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
