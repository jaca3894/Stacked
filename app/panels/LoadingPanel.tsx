import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, View, Text, Image } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withRepeat,
  withDelay,
} from "react-native-reanimated";
import { useLanguage } from "../../hooks/useLanguage";

const Dot = ({ delay }: { delay: number }) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1.4, { duration: 300 }),
          withTiming(1, { duration: 300 })
        ),
        -1
      )
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return <Animated.View style={[styles.dot, style]} />;
};

type LoadingPanelProps = {
  visible: boolean;
};

const LoadingPanel = ({ visible }: LoadingPanelProps) => {
  const { language } = useLanguage();
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    language === "pl" ? "Już prawie..." : "You are nearly there...",
    "One more sec..",
  ];

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setMessageIndex(1);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setMessageIndex(0);
    }
  }, [visible]);

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Image
          source={require("../../assets/icons/logo.png")} // 🖼️ Upewnij się, że ta ścieżka prowadzi do Twojego logo
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.message}>{messages[messageIndex]}</Text>
        <View style={styles.dotRow}>
          <Dot delay={0} />
          <Dot delay={200} />
          <Dot delay={400} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  message: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    paddingBottom: 20,
  },
  dotRow: {
    flexDirection: "row",
    gap: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ccbb9c",
  },
});

export default LoadingPanel;
