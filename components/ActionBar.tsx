import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface ActionBarProps {
  onHit: () => void;
  onStand: () => void;
  onDouble?: () => void;
  onInsurance?: () => void;
  canDouble: boolean;
  canInsure: boolean;
}

const ActionBar: React.FC<ActionBarProps> = ({
  onHit,
  onStand,
  onDouble,
  onInsurance,
  canDouble,
  canInsure,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onHit}>
        <Text style={styles.text}>Hit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onStand}>
        <Text style={styles.text}>Stand</Text>
      </TouchableOpacity>
      {canDouble && onDouble && (
        <TouchableOpacity style={styles.button} onPress={onDouble}>
          <Text style={styles.text}>Double</Text>
        </TouchableOpacity>
      )}
      {canInsure && onInsurance && (
        <TouchableOpacity style={styles.button} onPress={onInsurance}>
          <Text style={styles.text}>Insurance</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#cbbb9c",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginVertical: 6,
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ActionBar;
