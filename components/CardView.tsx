import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Card from "../classes/Card";

interface Props {
  card: Card;
}

const CardView: React.FC<Props> = ({ card }) => {
  const value =
    card.rank.toUpperCase() === "T" ? "10" : card.rank.toUpperCase();
  const suit =
    card.suit === "hearts"
      ? "♥"
      : card.suit === "diamonds"
      ? "♦"
      : card.suit === "clubs"
      ? "♣"
      : "♠";
  const isRed = card.suit === "hearts" || card.suit === "diamonds";

  return (
    <View style={[styles.card, { borderColor: "#888" }]}>
      <Text
        style={[
          styles.corner,
          { alignSelf: "flex-start" },
          isRed && styles.red,
        ]}
      >
        {value}
      </Text>
      <Text style={[styles.suit, isRed && styles.red]}>{suit}</Text>
      <Text
        style={[
          styles.corner,
          {
            alignSelf: "flex-end",
            transform: [{ rotate: "180deg" }],
          },
          isRed && styles.red,
        ]}
      >
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 40,
    aspectRatio: 0.66,
    backgroundColor: "white",
    borderRadius: 6,
    borderWidth: 1,
    padding: 2,
    justifyContent: "space-between",
    alignItems: "center",
  },
  suit: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
  },
  corner: {
    fontSize: 10,
    fontWeight: "bold",
  },
  red: {
    color: "#D40000",
  },
});

export default CardView;
