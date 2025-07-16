import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Player from "../../classes/Player";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const SavesScreen = () => {
  const navigation = useNavigation();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [lastPokerGamePlayers, setLastPokerGamePlayers] = useState<any>();
  const [lastBlackjackGamePlayers, setLastBlackjackGamePlayers] = useState<any>();

  useFocusEffect(
    useCallback(() => {
      const fetchLastGame = async () => {
        try {
          const lastPokerGame = await AsyncStorage.getItem("@lastPokerGameSave");
          const lastBlackjackGame = await AsyncStorage.getItem("@lastBlackjackGameSave");
          const pokerGames = await AsyncStorage.getItem("@pokerGameSaves");
          const blackjackGames = await AsyncStorage.getItem("@blackjackGameSaves");

          if(!lastPokerGame && !lastBlackjackGame && !pokerGames && !blackjackGames)
            return;

          if(lastPokerGame) {
            const lastPokerGameInfo = JSON.parse(lastPokerGame);
            const players = lastPokerGameInfo.players;
            setLastPokerGamePlayers(players);
          }
          if(lastBlackjackGame) {
            const lastBlackjackGameInfo = JSON.parse(lastBlackjackGame);
            const players = lastBlackjackGameInfo.players;
            setLastBlackjackGamePlayers(players);
          }
          setIsLoading(false);
        }
        catch(err) {
          console.error(err);
        }
      }
      fetchLastGame();
    }, [])
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={{ flex: 1, backgroundColor: "#1c1c1c", position: "relative" }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              position: "absolute",
              top: "7%",
              left: "7%",
              zIndex: 2,
            }}
            >
            <Image
              source={require("../../assets/arrowRight.png")}
              style={{
                width: 20,
                height: 20,
                transform: [{ scaleX: -1 }],
              }}
              />
          </TouchableOpacity>
          {(!lastPokerGamePlayers && !lastBlackjackGamePlayers) && (
            <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "transparent",
            }}
            >
              <View
                style={{
                  width: "80%",
                  alignItems: "center",
                  position: "relative",
                }}
                >
                <Image
                  source={require("../../assets/dealer/dealerConfused.png")}
                  style={{
                    width: "100%",
                    resizeMode: "contain",
                    height: 210,
                  }}
                  />
                <View
                  style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: "rgba(28,28,28,0.5)",
                  }}
                  />
              </View>
              <Text
                style={{
                  marginTop: 10,
                  color: "gray",
                  textAlign: "center",
                  fontSize: 16,
                }}
                >
                {language === "pl" ? "Brak zapisanych gier." : "No saved games."}
              </Text>
            </View>
          )}
          {(!isLoading && lastPokerGamePlayers) && (
            <View style={styles.game}>
              <Text>{lastPokerGamePlayers[0].name}</Text>
              <TouchableOpacity
                style={styles.resumeButton}
                onPress={() => {
                  (navigation as any).navigate("PokerGame", {
                    playersCount: lastPokerGamePlayers.length,
                    loadGame: true,
                  });
                }}
                >
                <Ionicons name="play" size={16} color="#1c1c1c" />
                <Text style={styles.resumeText}>
                  {language === "pl" ? "Wznów" : "Resume"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  resumeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#cbbb93",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginTop: 16,
    alignSelf: "flex-start",
  },
  resumeText: {
    color: "#1c1c1c",
    fontWeight: "600",
    fontSize: 15,
    marginLeft: 6,
  },
  game: {
    width: '100%',
    padding: 20,
    height: '50%',
    backgroundColor: 'red',
  },
})

export default SavesScreen;
