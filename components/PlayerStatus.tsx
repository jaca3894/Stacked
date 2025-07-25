import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Image } from "react-native";
import CardView from "./CardView";
import Card from "../classes/Card";
import { useLanguage } from "../hooks/useLanguage";

interface PlayerStatusProps {
  name: string;
  balance: number;
  hand: Card[];
  points: string;
  hideSecondCard?: boolean;
  isFirstDeal: boolean;
}

const AnimatedCardBack: React.FC<{ shouldAnimate: boolean }> = ({
  shouldAnimate,
}) => {
  const opacity = useRef(new Animated.Value(shouldAnimate ? 0 : 1)).current;
  const translateY = useRef(new Animated.Value(shouldAnimate ? 10 : 0)).current;

  useEffect(() => {
    if (shouldAnimate) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [shouldAnimate]);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateY }],
        marginHorizontal: 4,
      }}
    >
      <Image
        source={require("../assets/poker/cardBack.png")}
        style={styles.cardImage}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const AnimatedCard: React.FC<{
  card: Card;
  shouldAnimate: boolean;
}> = ({ card, shouldAnimate }) => {
  const opacity = useRef(new Animated.Value(shouldAnimate ? 0 : 1)).current;
  const translateY = useRef(new Animated.Value(shouldAnimate ? 10 : 0)).current;

  useEffect(() => {
    if (shouldAnimate) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [shouldAnimate]);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateY }],
        marginHorizontal: 4,
      }}
    >
      <CardView card={card} />
    </Animated.View>
  );
};

const PlayerStatus: React.FC<PlayerStatusProps> = ({
  name,
  balance,
  hand,
  points,
  hideSecondCard,
  isFirstDeal,
}) => {
  const prevHandRef = useRef<Card[]>([]);

  const { language } = useLanguage();
  useEffect(() => {
    // Update previous hand on the next tick to keep current `prevHandRef` valid during render
    requestAnimationFrame(() => {
      prevHandRef.current = [...hand];
    });
  }, [hand]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.balance}>
        {language === "pl" ? "Saldo" : "Balance:"} {balance}
      </Text>
      {!(name === "Dealer" && hideSecondCard) ? (
        <Text style={styles.points}>
          {language === "pl" ? "Punkty:" : "Points:"} {points}
        </Text>
      ) : (
        <Text style={styles.points}>
          {language === "pl" ? "Punkty: " : "Points: "} ???
        </Text>
      )}

      <View style={styles.hand}>
        {hand.map((card, index) => {
          const prevCard = prevHandRef.current[index];

          const cardChanged =
            isFirstDeal || // animate all cards on first deal
            !prevCard || // this is a new card (hit)
            prevCard.toString() !== card.toString();

          const isHidden = hideSecondCard && name === "Dealer" && index === 1;

          if (isHidden) {
            return (
              <AnimatedCardBack
                key={index+1}
                shouldAnimate={cardChanged}
              />
            );
          }

          return (
            <AnimatedCard
              key={`${card.toString() ?? index}`}
              card={card}
              shouldAnimate={cardChanged}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // backgroundColor: "blue",
    marginVertical: 12,
    alignItems: "center",
    zIndex: 2,
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
  cardImage: {
    width: 40,
    height: 60,
    // aspectRatio: 0.66,
    backgroundColor: "transparent",
    borderRadius: 6,
    borderWidth: 1,
    padding: 2,
  },
});

export default PlayerStatus;
