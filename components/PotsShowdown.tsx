import {
  Modal,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
} from "react-native";
import Pot from "../classes/Pot";
import Player from "../classes/Player";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useLanguage } from "../hooks/useLanguage";

const [screenWidth, screenHeight] = [
  Dimensions.get("window").width,
  Dimensions.get("window").height,
];

const PotsShowdown = ({
  players,
  onClose,
}: {
  players: Player[];
  onClose: () => void;
}) => {
  const [selectedPotWinners, setSelectedPotWinners] = useState<
    Record<number, Player[]>
  >({});
  const [pots, setPots] = useState<Pot[]>([
    new Pot(players.filter((player) => !player.folded)),
  ]);
  const navigation = useNavigation();
  const { language } = useLanguage();

  useEffect(() => {
    const generatedPots = myCreateSidePots();
    setPots(generatedPots);
  }, [players]);

  const handleSelectWinner = (potIndex: number, player: Player) => {
    setSelectedPotWinners((prev) => {
      const currentWinners = prev[potIndex] || [];
      const isAlreadySelected = currentWinners.includes(player);

      const updatedWinners = isAlreadySelected
        ? currentWinners.filter((p) => p !== player) // remove
        : [...currentWinners, player]; // add

      return {
        ...prev,
        [potIndex]: updatedWinners,
      };
    });
  };

  const addMoneyToWinners = () => {
    pots.forEach((pot, index) => {
      const winners = selectedPotWinners[index];
      if (!winners || winners.length === 0) {
        alert(
          language === "pl"
            ? `Nie wybrano zwycięzcy dla ${pot.name}`
            : `No winner selected for ${pot.name}`
        );
        return;
      }

      const share = pot.balance / winners.length;
      winners.forEach((winner) => {
        winner.balance += share;
      });
    });
    onClose();
  };

  const endGame = () => {
    (navigation as any).navigate("MainTabs", { screen: "Play" });
  };

  const myCreateSidePots = () => {
    // Filter active (not folded) players
    const activePlayers = players.filter((p) => !p.folded);

    // Extract unique bet values, sort ascending
    const uniqueBets = Array.from(
      new Set(activePlayers.map((p) => p.currentBet))
    ).sort((a, b) => a - b);

    const pots: Pot[] = [];
    let previousBet = 0;

    uniqueBets.forEach((bet, index) => {
      const betDifference = bet - previousBet;
      if (betDifference <= 0) {
        // No additional pot needed
        previousBet = bet;
        return;
      }

      // Players eligible for this pot: those who contributed at least 'bet'
      const contributingPlayers = activePlayers.filter(
        (p) => p.currentBet >= bet
      );
      const potAmount = betDifference * contributingPlayers.length;

      // Create and name the pot
      const pot = new Pot(contributingPlayers);
      pot.balance = potAmount;
      pot.name =
        index === 0
          ? language === "pl"
            ? "Główna Pula"
            : "Main Pot"
          : language === "pl"
          ? "Poboczna Pula"
          : `Side Pot ${index}`;
      pots.push(pot);

      previousBet = bet;
    });

    return pots;
  };

  return (
    <Modal transparent animationType="fade" statusBarTranslucent>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.5)" />
      <View style={styles.popUp}>
        <View style={styles.popUpInside}>
          <Text style={{ color: "#fff", fontSize: 35 }}>
            {language === "pl" ? "Koniec gry" : "Showdown"}
          </Text>
          {players.length !== 1 && (
            <Text style={{ color: "hsl(0, 0%, 50%)" }}>
              {language === "pl"
                ? "Wybierz zwycięzców puli"
                : "Select pot winner(s)"}
            </Text>
          )}

          {players.length !== 1 &&
            pots.map((pot, potIndex) => {
              const winners = selectedPotWinners[potIndex] || [];

              return (
                <View
                  key={potIndex + 1}
                  style={{ marginBottom: 10, padding: 10 }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    {`${pot.name}: ${pot.balance}`}
                  </Text>
                  <View style={styles.playersView}>
                    {players
                      .filter((player) => pot.players.includes(player))
                      .map((player, playerIndex) => {
                        const isSelected = winners.includes(player);

                        return (
                          <TouchableOpacity
                            key={playerIndex + 1}
                            style={[
                              styles.playerButton,
                              isSelected && styles.playerSelected,
                            ]}
                            onPress={() => handleSelectWinner(potIndex, player)}
                          >
                            <Text style={styles.text}>{player.name}</Text>
                          </TouchableOpacity>
                        );
                      })}
                  </View>
                  <Text style={styles.selectedPlayersText}>
                    {language === "pl" ? "Wybrano" : "Selected"}{" "}
                    {winners.length}/{pot.players.length}
                  </Text>
                </View>
              );
            })}

          {players.length === 1 && (
            <Text style={styles.winnerText}>
              {language === "pl" ? "Zwycięzca:" : "Winner:"} {players[0].name}
            </Text>
          )}

          {players.length !== 1 && (
            <TouchableHighlight
              style={styles.nextButton}
              onPress={addMoneyToWinners}
            >
              <Text style={styles.text}>
                {language === "pl" ? "Kolejne rozdanie" : "Next Hand"}
              </Text>
            </TouchableHighlight>
          )}
          {players.length === 1 && (
            <TouchableHighlight style={styles.nextButton} onPress={endGame}>
              <Text style={styles.text}>
                {language === "pl" ? "Zakończ grę" : "End Game"}
              </Text>
            </TouchableHighlight>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  popUp: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, .6)",
    justifyContent: "center",
    alignItems: "center",
  },
  popUpInside: {
    width: screenWidth * 0.95,
    height: screenHeight * 0.8,
    backgroundColor: "#121212",
    borderRadius: 10,
    alignItems: "center",
    padding: 20,
  },
  playersView: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  playerButton: {
    borderColor: "#33f",
    borderWidth: 2,
    borderRadius: 6,
    padding: 8,
    margin: 4,
  },
  playerSelected: {
    backgroundColor: "#33f",
  },
  selectedPlayersText: {
    marginTop: "1%",
    color: "hsl(0, 0%, 75%)",
    textAlign: "center",
  },
  text: {
    color: "#fff",
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: "#cbbb9c",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  winnerText: {
    color: "#fff",
    fontSize: 44,
  },
});

export default PotsShowdown;
