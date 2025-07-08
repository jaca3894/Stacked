import { Text } from "react-native"
import { View } from "react-native-animatable"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

const SettingsScreen = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <Text>Settings</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default SettingsScreen;