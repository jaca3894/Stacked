import { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import Toast from "react-native-toast-message";
import toastConfig from "../../config/ToastConfig";
import { HandRank, handrank } from "../../utils/Handrank";

const generateDeck = () => {
  const values = [
    "A",
    "K",
    "Q",
    "J",
    "T",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
  ];
  const suits = [
    { symbol: "♠", color: "black", code: "s" },
    { symbol: "♥", color: "red", code: "h" },
    { symbol: "♣", color: "black", code: "c" },
    { symbol: "♦", color: "red", code: "d" },
  ];

  return suits.flatMap((suit) =>
    values.map((value) => ({
      id: `${value}${suit.code}`,
      value,
      suit: suit.symbol,
      color: suit.color,
    }))
  );
};

type Card = {
  id: string;
  value: string;
  suit: string;
  color: string;
};

const renderCard = (code: string) => {
  const valueCode =
    code[0].toUpperCase() === "T" ? "10" : code[0].toUpperCase();
  const suitCode = code[1];
  const suitSymbol =
    suitCode === "s"
      ? "♠"
      : suitCode === "h"
      ? "♥"
      : suitCode === "c"
      ? "♣"
      : "♦";
  const color = suitCode === "h" || suitCode === "d" ? "red" : "black";

  return (
    <View
      style={{
        flex: 1,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: "white",
        borderColor: "#888",
        padding: 2,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text style={[styles.cornerLeftText, { color }]}>{valueCode}</Text>
      <Text style={[styles.suitSymbol, { color }]}>{suitSymbol}</Text>
      <Text
        style={[
          styles.cornerRightText,
          { color, transform: [{ rotate: "180deg" }] },
        ]}
      >
        {valueCode}
      </Text>
    </View>
  );
};

const CheckHandScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [evaluatedHand, setEvaluatedHand] = useState<HandRank | null>(null);

  const [selectedCards, setSelectedCards] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const deck = generateDeck();

  const showToast = (message: string) => {
    Toast.show({
      type: "error",
      text1: message,
      position: "top",
      swipeable: true,
    });
  };

  const handleReset = () => {
    setSelectedCards(Array(7).fill(""));
  };

  const handleEvaluate = () => {
    const filled = selectedCards.filter((c) => c !== "");
    if (filled.length < 2) {
      showToast("Pick at least 2 cards.");
      return;
    }
    const result = handrank(filled);
    setEvaluatedHand(result);
    setModalVisible(true);
  };

  const handleCardSelect = (card: Card) => {
    const value =
      card.value.toLowerCase() === "t" ? "t" : card.value.toLowerCase();
    const suitCode =
      card.suit === "♠"
        ? "s"
        : card.suit === "♥"
        ? "h"
        : card.suit === "♣"
        ? "c"
        : "d";
    const formatted = `${value}${suitCode}`;

    const isAlreadySelected = selectedCards
      .filter((c) => c !== "")
      .includes(formatted);
    const nextSlot = selectedCards.findIndex((c) => c === "");

    if (isAlreadySelected) {
      showToast("This card is already selected.");
      return;
    }

    if (nextSlot === -1) {
      showToast("You can't pick more than 7 cards.");
      return;
    }

    const updated = [...selectedCards];
    updated[nextSlot] = formatted;
    setSelectedCards(updated);
  };

  const handleSlotPress = (indexToRemove: number) => {
    const updated = selectedCards.filter((_, index) => index !== indexToRemove);
    while (updated.length < 7) updated.push(""); // uzupełnij puste sloty na koniec
    setSelectedCards(updated);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Image
          source={require("../../assets/logo/logo.png")}
          style={styles.logo}
        />
      </SafeAreaView>
      <View style={styles.content}>
        <Text style={styles.buttonText}>
          Select your cards. See what you've got.
        </Text>
        <View style={styles.dropZone}>
          {selectedCards.map((card, index) => (
            <TouchableOpacity
              key={index}
              style={styles.emptyCardSlot}
              onPress={() => handleSlotPress(index)}
              activeOpacity={card !== "" ? 0.6 : 1}
            >
              {card !== "" && renderCard(card)}
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            width: "90%",
            flexDirection: "row",
            height: "7%",
            marginHorizontal: "5%",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity style={styles.button} onPress={handleEvaluate}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button]} onPress={handleReset}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.deckPanel}>
          <View style={styles.deckGrid}>
            {deck.map((card) => {
              const value =
                card.value.toLowerCase() === "t"
                  ? "t"
                  : card.value.toLowerCase();
              const suitCode =
                card.suit === "♠"
                  ? "s"
                  : card.suit === "♥"
                  ? "h"
                  : card.suit === "♣"
                  ? "c"
                  : "d";
              const formatted = `${value}${suitCode}`;
              const isSelected = selectedCards.includes(formatted);

              return (
                <TouchableOpacity
                  key={card.id}
                  style={[styles.cardView, { opacity: isSelected ? 0.5 : 1 }]}
                  onPress={() => handleCardSelect(card)}
                >
                  <Text style={[styles.cornerLeftText, { color: card.color }]}>
                    {card.value === "T" ? "10" : card.value}
                  </Text>
                  <Text style={[styles.suitSymbol, { color: card.color }]}>
                    {card.suit}
                  </Text>
                  <Text
                    style={[
                      styles.cornerRightText,
                      { color: card.color, transform: [{ rotate: "180deg" }] },
                    ]}
                  >
                    {card.value === "T" ? "10" : card.value}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>2025 Stacked.</Text>
      </View>

      <Modal
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="fade"
        transparent={true} // <-- to jest kluczowe!
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // półprzezroczyste tło
            justifyContent: "center", // wyśrodkowanie w pionie
            alignItems: "center", // wyśrodkowanie w poziomie
          }}
        >
          <View
            style={{
              // width: "75%",
              // height: "25%",
              backgroundColor: "#222",
              borderRadius: 12,
              padding: 30,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 2,
              borderColor: "#cbbb9c",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#fff",
                marginBottom: 10,
              }}
            >
              🃏 Poker Hand Evaluation
            </Text>

            {evaluatedHand && (
              <>
                <Text
                  style={{
                    fontSize: 18,
                    color: "#0f0",
                    marginBottom: 4,
                    fontWeight: "bold",
                  }}
                >
                  {evaluatedHand.handType}
                </Text>
                <Text style={{ fontSize: 14, color: "#ccc" }}>
                  Hand strength value: {evaluatedHand.value}
                </Text>
              </>
            )}

            <TouchableOpacity
              style={{
                marginTop: 20,
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: "#444",
                borderRadius: 6,
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Toast config={toastConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
  },
  header: {
    height: "20%",
    backgroundColor: "#1c1c1c",
    // borderWidth: 1,
    // borderColor: "red",
    justifyContent: "flex-end",
  },
  logo: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
  },
  content: {
    // borderWidth: 1,
    // borderColor: "red",
    height: "70%",
    alignContent: "center",
  },
  dropZone: {
    width: "90%",
    height: "20%",
    // borderWidth: 1,
    // borderColor: "yellow",
    alignSelf: "center",
    margin: 10,
    flexDirection: "row",
  },
  emptyCardSlot: {
    borderWidth: 1,
    borderColor: "gray",
    flex: 1,
    marginHorizontal: 5,
    marginVertical: "7%",
    borderRadius: 7,
  },
  button: {
    width: "40%",
    backgroundColor: "#1c1c1c",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#cbbb93",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  deckPanel: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: "red",
    padding: "7%",
  },
  deckGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 4,
  },
  cardView: {
    width: "10%", // 9-10 kart w rzędzie zależnie od marginesów
    aspectRatio: 0.66, // standardowy stosunek kart (np. 60x90)
    backgroundColor: "white",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#888",
    padding: 2,
    justifyContent: "space-between",
    alignItems: "center",
  },
  suitSymbol: {
    fontSize: 12,
    textAlign: "center",
    marginVertical: 2,
  },
  cornerLeftText: {
    fontSize: 10,
    alignSelf: "flex-start",
  },
  cornerRightText: {
    fontSize: 10,
    alignSelf: "flex-end",
  },
  footer: {
    // borderWidth: 1,
    // borderColor: "red",
    height: "10%",
    justifyContent: "center",
    alignSelf: "center",
    // justifyContent: 'center',
    // alignItems: 'center',
    // position: 'absolute',
    // bottom: 0,
    // left: '50%',
    // transform: [{translateX: '-50%'}],
  },
  footerText: {
    color: "gray",
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: "auto",
  },
});

export default CheckHandScreen;
