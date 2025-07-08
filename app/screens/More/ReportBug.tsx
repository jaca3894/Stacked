import { StyleSheet, Text } from "react-native"
import { View } from "react-native-animatable"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

const ReportBugScreen = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={{color: '#fff'}}>Report Bug</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  }
})

export default ReportBugScreen;