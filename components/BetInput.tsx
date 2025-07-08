import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Pressable,
} from "react-native";

interface BetInputProps {
  max: number;
  onConfirm: (amount: number) => void;
}

const BetInput: React.FC<BetInputProps> = ({ max, onConfirm }) => {
  const [value, setValue] = useState(Math.min(10, max));

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startHolding = (fn: () => void) => {
    let delay = 300; // początkowe opóźnienie
    const minDelay = 30; // minimalne opóźnienie
    const acceleration = 0.85; // współczynnik przyspieszenia

    const run = () => {
      fn();
      delay = Math.max(minDelay, delay * acceleration);
      intervalRef.current = setTimeout(run, delay);
    };

    fn(); // wykonaj raz natychmiast
    intervalRef.current = setTimeout(run, delay);
  };

  const stopHolding = () => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
  };
  const increase = () => setValue((v) => Math.min(max, v + 1));
  const decrease = () => setValue((v) => Math.max(1, v - 1));

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Choose your bet:</Text>
      <View style={styles.stepperRow}>
        <TouchableOpacity
          onPressIn={() => startHolding(decrease)}
          onPressOut={stopHolding}
          style={styles.stepperButton}
        >
          <Text style={styles.buttonText}>–</Text>
        </TouchableOpacity>

        <Text style={styles.valueLabel}>{value} ⛃</Text>

        <TouchableOpacity
          onPressIn={() => startHolding(increase)}
          onPressOut={stopHolding}
          style={styles.stepperButton}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 12 }}>
        <Pressable onPress={() => onConfirm(value)} disabled={value < 1}>
          <Text
            style={{
              fontWeight: "bold",
              textTransform: "uppercase",
              alignSelf: "flex-start",
              padding: 10,
              backgroundColor: "#cbbb9c",
              borderRadius: 10,
            }}
          >
            {value < 1 ? "Insufficient chips" : "Confirm bet"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
    zIndex: 2,
  },
  label: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 8,
  },
  stepperRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepperButton: {
    backgroundColor: "#cbbb9c",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    marginHorizontal: 12,
  },
  buttonText: {
    fontSize: 28,
    color: "black",
    fontWeight: "bold",
  },
  valueLabel: {
    color: "#fff",
    fontSize: 24,
    minWidth: 60,
    textAlign: "center",
  },
});

export default BetInput;
