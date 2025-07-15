import {
  StyleSheet,
  Text,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native-animatable";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useLanguage } from "../../../hooks/useLanguage";

const FeedbackScreen = () => {
  const navigation = useNavigation();
  const [showContent, setShowContent] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    Linking.openURL("https://www.google.com/");

    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000); // 🕒 2 sekundy opóźnienia

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            top: "10%",
            left: "7%",
            zIndex: 2,
          }}
        >
          <Image
            source={require("../../../assets/arrowRight.png")}
            style={{
              width: 20,
              height: 20,
              transform: [{ scaleX: -1 }],
            }}
          />
        </TouchableOpacity>

        {showContent && (
          <View style={styles.content}>
            <Image
              source={require("../../../assets/dealer/dealerThanks.png")}
              style={styles.image}
            />
            <Text style={styles.title}>
              {language === "pl"
                ? "Dziękujemy za Twoją opinię!"
                : "Thank you for your feedback!"}
            </Text>
            <Text style={styles.subtitle}>
              {language === "pl"
                ? "Pomoże nam ona poprawić naszą aplikację i uczynić ją jeszcze lepszą!"
                : "Your opinion helps us improve the app and make it even better."}
            </Text>
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
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

export default FeedbackScreen;
