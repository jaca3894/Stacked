import React, { useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
} from "react-native";

interface Props {
  visible: boolean;
  onDismiss?: () => void;
}

const BlackjackWinModal: React.FC<Props> = ({ visible, onDismiss }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            if (onDismiss) onDismiss();
          });
        }, 2000);
      });
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="none">
      <View style={styles.overlay}>
        <Animated.View
          style={[styles.modal, { opacity, transform: [{ scale }] }]}
        >
          <Text style={styles.title}>Blackjack! 🃏</Text>
          <Text style={styles.subtitle}>3:2 payout 💰</Text>
        </Animated.View>
      </View>
    </Modal>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#222",
    paddingVertical: 30,
    paddingHorizontal: 40,
    borderRadius: 14,
    borderColor: "#ffd700",
    borderWidth: 2,
    shadowColor: "#fff",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 12,
    fontSize: 16,
    color: "#eee",
    textAlign: "center",
  },
});

export default BlackjackWinModal;
