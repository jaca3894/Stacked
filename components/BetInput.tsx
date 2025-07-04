import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Toast from "react-native-toast-message";

interface BetInputProps {
  max: number;
  onConfirm: (amount: number) => void;
}

const BetInput: React.FC<BetInputProps> = ({ max, onConfirm }) => {
  const [bet, setBet] = useState("");
  //   const [error, setError] = useState("");

  const handleConfirm = () => {
    const amount = parseInt(bet);
    if (isNaN(amount) || amount <= 0) {
      Toast.show({
        type: "error", // lub 'success'
        text1: "Invalid amount",
        text2: "Please enter a valid number.",
      });
    } else if (amount > max) {
      Toast.show({
        type: "error", // lub 'success'
        text1: "Insufficient funds",
        text2: "You dont have that much chips.",
      });
    } else {
      onConfirm(amount);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your bet</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="0"
        value={bet}
        onChangeText={setBet}
      />
      {/* {error !== "" && <Text style={styles.error}>{error}</Text>} */}
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirm Bet</Text>
      </TouchableOpacity>
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 40,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    width: screenWidth < 500 ? 140 : 180,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  error: {
    color: "#f66",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 4,
  },
  buttonText: {
    color: "#222",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BetInput;
