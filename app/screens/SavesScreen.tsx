import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useLanguage } from "../../hooks/useLanguage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Player from "../../classes/Player"; // Make sure this path is correct
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import GameSavePanel from "../../components/GameSavePanel";
import ActionButton from "../../components/ActionButton";

// A helper component to render the game panel. This avoids code duplication.

interface GameType {
  id: string;
  title: string;
  gameType: "Poker" | "Blackjack";
  players: Player[];
}

const SavesScreen = () => {
  const navigation = useNavigation();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  // --- FIX 1: Initialize state with an empty ARRAY [] ---
  // This prevents crashes when the component first loads.
  const [lastPokerPlayers, setLastPokerPlayers] = useState<Player[]>([]);
  const [lastBlackjackPlayers, setLastBlackjackPlayers] = useState<Player[]>([]);
  const [pokerGames, setPokerGames] = useState<GameType[]>([]);
  const [blackjackGames, setBlackjackGames] = useState<GameType[]>([]);
  const [selectedGameType, setSelectedGameType] = useState<"Poker" | "Blackjack">(pokerGames.length > 0 ? "Poker" : "Blackjack");
  
  useFocusEffect(
    useCallback(() => {
      const fetchSaves = async () => {
        setIsLoading(true);
        try {
          // Fetch both game saves in parallel for speed
          const [lastPokerSaveJSON, lastBlackjackSaveJSON, pokerSavesJSON, blackjackSavesJSON] = await Promise.all([
            AsyncStorage.getItem("@lastPokerGameSave"),
            AsyncStorage.getItem("@lastBlackjackGameSave"),
            AsyncStorage.getItem("@pokerGameSaves"),
            AsyncStorage.getItem("@blackjackGameSaves"),
          ]);

          
          AsyncStorage.getItem("@pokerGameSaves")
          
          if (lastPokerSaveJSON) {
            const lastPokerData = JSON.parse(lastPokerSaveJSON);
            // Ensure players data is an array before setting it
            setLastPokerPlayers(Array.isArray(lastPokerData.players) ? lastPokerData.players : []);
          } else {
            setLastPokerPlayers([]); // Explicitly set to empty if no save exists
          }
          
          if (lastBlackjackSaveJSON) {
            const lastBlackjackData = JSON.parse(lastBlackjackSaveJSON);
            setLastBlackjackPlayers(Array.isArray(lastBlackjackData.players) ? lastBlackjackData.players : []);
          } else {
            setLastBlackjackPlayers([]);
          }

          if (pokerSavesJSON) {
            const pokerGamesData = JSON.parse(pokerSavesJSON);
            setPokerGames(Array.isArray(pokerGamesData) ? pokerGamesData : []);
          }
          else {
            setPokerGames([]);
          }

          if (blackjackSavesJSON) {
            const blackjackGamesData = JSON.parse(blackjackSavesJSON);
            setBlackjackGames(Array.isArray(blackjackGamesData) ? blackjackGamesData : []);
          }
          else {
            setBlackjackGames([]);
          }

        } catch (err) {
          console.error("Failed to fetch game saves:", err);
          // Reset on error
          setLastPokerPlayers([]);
          setLastBlackjackPlayers([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchSaves();
    }, [])
  );

  useEffect(() => {
    AsyncStorage.setItem("@pokerGameSaves", JSON.stringify(pokerGames));
    AsyncStorage.setItem("@blackjackGameSaves", JSON.stringify(blackjackGames));
  }, [pokerGames, blackjackGames])

  const generateId = () => {
    return Math.random().toString(36).substr(2, 15) + Math.random().toString(36).substr(2, 15);
  };
  
  const hasPokerSave = lastPokerPlayers.length > 0;
  const hasBlackjackSave = lastBlackjackPlayers.length > 0;
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
              players={lastPokerPlayers}
              language={language}
              navigator={navigation}
              onSave={() => {
                if(pokerGames.find(game => game.players === lastPokerPlayers)) { return; } 
                setPokerGames(prev => [...prev, {id: generateId(), title: new Date().toLocaleString(), gameType: 'Poker', players: lastPokerPlayers}])
              }}
            />
          )}

          {hasBlackjackSave && (
            <GameSavePanel
              gameType="Blackjack"
              players={lastBlackjackPlayers}
              language={language}
              navigator={navigation}
              onSave={() => {
                if(blackjackGames.find(game => game.players === lastBlackjackPlayers)) { return; } 
                setBlackjackGames(prev => [...prev, {id: generateId(), title: new Date().toLocaleString(), gameType: 'Blackjack', players: lastBlackjackPlayers}])
                }}
                />
          )}
          {(pokerGames.length > 0 || blackjackGames.length > 0) && (
            <View>
              <View style={styles.lineContainer}>
                <View style={[styles.line]} />
                <Text style={[styles.lineText]}>{language === 'pl' ? "Zapisy" : "Saves"}</Text>
                <View style={[styles.line]} />
              </View>
              <View style={{flexDirection: 'column', gap: 15}}>
                <View style={{flexDirection: 'row', gap: 10}}>
                  {pokerGames.length > 0 && <ActionButton text="Poker" onPress={() => {setSelectedGameType('Poker')}} addButtonStyle={selectedGameType == 'Poker' && styles.activeGameType} />}
                  {blackjackGames.length > 0 && <ActionButton text="Blackjack" onPress={() => {setSelectedGameType('Blackjack')}} addButtonStyle={selectedGameType == 'Blackjack' && styles.activeGameType} />}
                </View>
                {selectedGameType == "Poker" && pokerGames?.map(game => {
                    return (
                      <GameSavePanel
                        key={game.id}
                        title={game.title}
                        gameType={game.gameType}
                        players={game.players}
                        language={language}
                        navigator={navigation}
                        showDeleteButton={true}
                        onDelete={() => {setPokerGames(prev => prev.filter(g => g.id !== game.id))}}
                      />
                    )
                  })
                }
                {selectedGameType == "Blackjack" && blackjackGames?.map(game => {
                    return (
                      <GameSavePanel
                        key={game.id}
                        title={game.title}
                        gameType={game.gameType}
                        players={game.players}
                        language={language}
                        navigator={navigation}
                        showDeleteButton={true}
                        onDelete={() => {setBlackjackGames(prev => prev.filter(g => g.id !== game.id))}}
                      />
                    )
                  })
                }
              </View>
            </View>
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
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  line: {
    width: '45%',
    height: 1,
    backgroundColor: '#666',
  },
  lineText: {
    // Add horizontal margin to create space between the lines and the text
    marginHorizontal: 8,
    color: '#eee', // A medium gray color for the text
    fontSize: 14,
    fontWeight: '600',
    flexShrink: 0,
  },
  activeGameType: {
    outlineColor: 'white',
    outlineWidth: 2,
  }
});

export default SavesScreen;