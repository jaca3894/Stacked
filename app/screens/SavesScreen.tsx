import React, { useState, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useLanguage } from "../../hooks/useLanguage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Player from "../../classes/Player"; // Make sure this path is correct
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import GameSavePanel from "../../components/GameSavePanel";

// A helper component to render the game panel. This avoids code duplication.

const SavesScreen = () => {
  const navigation = useNavigation();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  // --- FIX 1: Initialize state with an empty ARRAY [] ---
  // This prevents crashes when the component first loads.
  const [pokerPlayers, setPokerPlayers] = useState<Player[]>([]);
  const [blackjackPlayers, setBlackjackPlayers] = useState<Player[]>([]);
  
  useFocusEffect(
    useCallback(() => {
      const fetchSaves = async () => {
        setIsLoading(true);
        try {
          // Fetch both game saves in parallel for speed
          const [pokerSaveJSON, blackjackSaveJSON] = await Promise.all([
            AsyncStorage.getItem("@lastPokerGameSave"),
            AsyncStorage.getItem("@lastBlackjackGameSave"),
          ]);
          
          if (pokerSaveJSON) {
            const pokerData = JSON.parse(pokerSaveJSON);
            // Ensure players data is an array before setting it
            setPokerPlayers(Array.isArray(pokerData.players) ? pokerData.players : []);
          } else {
            setPokerPlayers([]); // Explicitly set to empty if no save exists
          }
          
          if (blackjackSaveJSON) {
            const blackjackData = JSON.parse(blackjackSaveJSON);
            setBlackjackPlayers(Array.isArray(blackjackData.players) ? blackjackData.players : []);
          } else {
            setBlackjackPlayers([]);
          }

        } catch (err) {
          console.error("Failed to fetch game saves:", err);
          // Reset on error
          setPokerPlayers([]);
          setBlackjackPlayers([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchSaves();
    }, [])
  );
  
  const hasPokerSave = pokerPlayers.length > 0;
  const hasBlackjackSave = blackjackPlayers.length > 0;
  const noGamesFound = !isLoading && !hasPokerSave && !hasBlackjackSave;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Image
                source={require("../../assets/arrowRight.png")}
                style={styles.backButtonImage}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{language === "pl" ? "Zapisane Gry" : "Saved Games"}</Text>
          </View>
          
          {isLoading && (
            <View style={styles.centered}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
          )}
          
          {noGamesFound && (
            <View style={styles.centered}>
              <Image
                source={require("../../assets/dealer/dealerConfused.png")}
                style={styles.dealerImage}
              />
              <View style={styles.imageOverlay} />
              <Text style={styles.noGamesText}>
                {language === "pl" ? "Brak zapisanych gier." : "No saved games."}
              </Text>
            </View>
          )}

          {/* --- FIX 2: Render each panel conditionally --- */}
          {hasPokerSave && (
            <GameSavePanel
              gameType="Poker"
              players={pokerPlayers}
              language={language}
              navigator={navigation}
            />
          )}

          {hasBlackjackSave && (
            <GameSavePanel
              gameType="Blackjack"
              players={blackjackPlayers}
              language={language}
              navigator={navigation}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};


// --- FIX 3: Adopted styles from HomeScreen for consistency ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1c1c1c",
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    position: 'relative',
    justifyContent: 'center',
  },
  headerTitle: {
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
  },
  backButton: {
    position: "absolute",
    left: 0, // Adjusted for better alignment
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    padding: 10,
    zIndex: 2,
  },
  backButtonImage: {
    width: 20,
    height: 20,
    transform: [{ scaleX: -1 }],
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'gray',
    fontSize: 16
  },
  dealerImage: {
    width: "80%",
    resizeMode: "contain",
    height: 210,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(28,28,28,0.5)",
  },
  noGamesText: {
    marginTop: 10,
    color: "gray",
    textAlign: "center",
    fontSize: 16,
  },
  panel: {
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  gameHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  gameTitle: {
    fontSize: 18,
    color: "#cbbb93",
    fontWeight: "700",
  },
  playerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderColor: "#3a3a3a",
  },
  playerIndex: {
    color: "#aaa",
    fontWeight: "500",
    width: 24,
  },
  playerName: {
    color: "#fff",
    flex: 1,
    fontWeight: "600",
  },
  playerScore: {
    color: "#cbbb93",
    fontWeight: "700",
    fontSize: 16,
  },
  morePlayersText: {
    fontSize: 14,
    color: "#999999",
    marginTop: 8,
    textAlign: "right",
  },
  resumeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#cbbb93",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
    alignSelf: "flex-start",
  },
  resumeText: {
    color: "#1c1c1c",
    fontWeight: "600",
    fontSize: 15,
    marginLeft: 8,
  },
});

export default SavesScreen;