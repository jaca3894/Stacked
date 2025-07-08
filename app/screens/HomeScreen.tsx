import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import LoadingPanel from "../panels/LoadingPanel"; // Zakładamy, że masz ten komponent
import * as NavigationBar from "expo-navigation-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";

const screenWidth = Math.round(Dimensions.get("window").width);

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const loaderTime = 1000;
  if (Platform.OS === "android") {
    NavigationBar.setVisibilityAsync("hidden");
  }

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), loaderTime);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <LoadingPanel visible={loading} />}
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Animatable.View
            style={styles.header}
            animation="fadeIn"
            delay={1500}
            duration={1500}
          >
            <Image
              source={require("../../assets/logo/logo.png")}
              style={styles.logo}
            />
            <Text style={styles.text}>Hello, betatester!</Text>
          </Animatable.View>
          {/* <View style={{ position: "absolute", zIndex: -1, top: "0%", backgroundColor: "#cbbb9c", width: "100%", height: blockOneOffset}}></View>
            <View style={{ position: "absolute", zIndex: -1, top: blockOneOffset, backgroundColor: "#1c1c1c", width: "100%", height: blockTwoOffset}}></View>
            <View style={{ position: "absolute", zIndex: -1, top: blockThreeOffset, backgroundColor: "#cbbb9c", width: "100%", height: blockThreeHeight}}></View> */}
          <View style={styles.content}></View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>2025 Stacked.</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    flexDirection: "column",
    width: "100%",
  },
  header: {
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    height: "60%",
  },
  footer: {
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: [{ translateX: "-50%" }],
  },
  logo: {
    width: screenWidth * 0.35,
    height: screenWidth * 0.35,
    // marginHorizontal: 'auto'
  },
  text: {
    color: "hsl(0, 0%, 100%)",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  footerText: {
    color: "gray",
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: "auto",
  },
});

export default HomeScreen;
