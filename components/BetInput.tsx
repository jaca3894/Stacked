import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";

interface BetInputProps {
  max: number;
  onConfirm: (amount: number) => void;
}

const BetInput: React.FC<BetInputProps> = ({ max, onConfirm }) => {
  const [value, setValue] = useState(Math.min(10, max));

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startHolding = (fn: () => void) => {
    fn(); // od razu wykonaj raz
    intervalRef.current = setInterval(fn, 30);
  };

  const stopHolding = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
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

        <Text style={styles.valueLabel}>{value} 💰</Text>

        <TouchableOpacity
          onPressIn={() => startHolding(increase)}
          onPressOut={stopHolding}
          style={styles.stepperButton}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 12 }}>
        <Button
          title={value < 1 ? "Insufficient chips" : "Confirm bet"}
          onPress={() => onConfirm(value)}
          color="#FFD700"
          disabled={value < 1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
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
    backgroundColor: "#444",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    marginHorizontal: 12,
  },
  buttonText: {
    fontSize: 28,
    color: "#FFD700",
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
