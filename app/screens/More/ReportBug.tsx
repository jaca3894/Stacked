import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native-animatable";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";

const ReportBugScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    Linking.openURL("https://www.google.com/");
  }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image
            source={require("../../../assets/arrowRight.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.content}>
          <Image
            source={require("../../../assets/dealer/dealerThanks.png")}
            style={styles.image}
          />
          <Text style={styles.title}>Bug report submitted!</Text>
          <Text style={styles.subtitle}>
            Thanks for spotting that. Our dev team is on it!
          </Text>
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
  backButton: {
    position: "absolute",
    top: "12%",
    left: "7%",
    zIndex: 2,
  },
  backIcon: {
    width: 20,
    height: 20,
    transform: [{ scaleX: -1 }],
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  image: {
    width: 220,
    height: 220,
    resizeMode: "contain",
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#cbbb93",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    lineHeight: 22,
  },
});

export default ReportBugScreen;
