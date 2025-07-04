import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import CardView from "./CardView";
import Card from "../classes/Card";

interface PlayerStatusProps {
  name: string;
  balance: number;
  hand: Card[];
  points: string;
}

const PlayerStatus: React.FC<PlayerStatusProps> = ({
  name,
  balance,
  hand,
  points,
}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.balance}>Balance: {balance}</Text>
      <Text style={styles.points}>Points: {points}</Text>
      <View style={styles.hand}>
        {hand.map((card, index) => (
          <CardView key={index} card={card} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 12,
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  balance: {
    color: "#ccc",
    marginTop: 4,
  },
  points: {
    color: "#ccc",
    marginBottom: 6,
  },
  hand: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

export default PlayerStatus;
