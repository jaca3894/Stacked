import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Card from "../classes/Card";

interface CardViewProps {
  card: Card;
}

const CardView: React.FC<CardViewProps> = ({ card }) => {
  const isRed = card.suit === "hearts" || card.suit === "diamonds";
  const suitSymbols = {
    hearts: "♥",
    diamonds: "♦",
    spades: "♠",
    clubs: "♣",
  };

  return (
    <View style={styles.card}>
      <Text style={[styles.rank, isRed && styles.red]}>{card.rank}</Text>
      <Text style={[styles.suit, isRed && styles.red]}>
        {suitSymbols[card.suit]}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 50,
    height: 70,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
  },
  rank: {
    fontSize: 18,
    fontWeight: "bold",
  },
  suit: {
    fontSize: 20,
    marginTop: 4,
  },
  red: {
    color: "#D40000",
  },
});

export default CardView;
