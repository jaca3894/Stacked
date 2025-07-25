import {
  getNextUnmarkedItem,
  getCompletionPercentage,
} from "../../../utils/FindUnlikedArticle";
import { getRandomGlossaryTerm } from "../../../utils/GetRandomItem";
import React, { useState, useEffect, useRef } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import SystemNavigationBar from "react-native-system-navigation-bar";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  DimensionValue,
} from "react-native";
import LoadingPanel from "../../panels/LoadingPanel";
import * as NavigationBar from "expo-navigation-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Image as Gif } from "expo-image";
import { getArticlesData } from "../../../classes/Database";
import { CopilotStep, walkthroughable, useCopilot } from "react-native-copilot";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { withCopilotProvider } from "../../../utils/WithCopilotProvider";
import { useLanguage } from "../../../hooks/useLanguage";
import Player from "../../../classes/Player";
import BlackjackPlayer from "../../../classes/BlackjackPlayer";

const screenWidth = Math.round(Dimensions.get("window").width);

const CopilotView = walkthroughable(View);
const CopilotText = walkthroughable(Text);

const HomeScreen = () => {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const navigator = useNavigation();
  const [hasLastGame, setHasLastGame] = useState(false);
  const loaderTime = 1000;
  type GlossaryEntry = { term: string; definition: string };

  const [term, setTerm] = useState<GlossaryEntry | null>(null);

  // po załadowaniu ekranu pobierz losowy termin
  useEffect(() => {
    const fetchTerm = async () => {
      try {
        const term = await getRandomGlossaryTerm();
        setTerm(term);
      } catch (e) {
        console.error("Nie udało się pobrać losowego terminu:", e);
      }
    };
    fetchTerm();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchLastGame = async () => {
        try {
          const lastPokerGame = await AsyncStorage.getItem(
            "@lastPokerGameSave"
          );
          const lastBlackjackGame = await AsyncStorage.getItem(
            "@lastBlackjackGameSave"
          );
          let lastPokerGameDate = 0,
            lastBlackjackGameDate = 0;

          if (!lastPokerGame && !lastBlackjackGame) {
            setHasLastGame(false);
            return;
          }

          if (lastPokerGame) lastPokerGameDate = JSON.parse(lastPokerGame).date;
          if (lastBlackjackGame)
            lastBlackjackGameDate = JSON.parse(lastBlackjackGame).date;

          const gameType =
            lastPokerGameDate > lastBlackjackGameDate ? "Poker" : "Blackjack";
          const lastGameJSON =
            gameType == "Poker" ? lastPokerGame : lastBlackjackGame;
          if (typeof lastGameJSON == "string") {
            const players = JSON.parse(lastGameJSON).players;
            setLastGame({ gameType, players });
            if (players.length > 0) setHasLastGame(true);
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchLastGame();
    }, [])
  );

  // const percentage = getCompletionPercentage(articlesData);
  // console.log("Percent: " + percentage);
  // console.log(term);

  type ArticleData = {
    id: string;
    bannerPath: any; // lub: ImageSourcePropType z react-native
    title: string;
    content: string;
    category: string;
    categoryTabColor: string;
    date: string;
    videoLink: string;
    videoAuthor: string;
  };

  const [articlesData, setArticlesData] = useState<ArticleData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getArticlesData();
      setArticlesData(data);
    };
    fetchData();
  }, []);
  const { start } = useCopilot();

  const scrollRef = useRef<ScrollView>(null);
  const hasStartedTutorial = useRef(false);

  useFocusEffect(
    React.useCallback(() => {
      const checkTutorialFlag = async () => {
        try {
          const hasSeen = await AsyncStorage.getItem("@hasSeenHomTutorial");
          if (!hasSeen && !hasStartedTutorial.current) {
            // Odpalamy tutorial z opóźnieniem
            const timer = setTimeout(() => {
              hasStartedTutorial.current = true;
              start();
              AsyncStorage.setItem("@hasSeenHomTutorial", "true");
            }, 1250);

            return () => clearTimeout(timer);
          }
        } catch (error) {
          console.error("Error checking tutorial flag.", error);
        }
      };

      // ma byc !dev jesli production ready
      if (!__DEV__) {
        checkTutorialFlag();
      }
    }, [start])
  );

  const [lastGame, setLastGame] = useState<any>({});

  const players = lastGame?.players
    ?.map((player: Player | BlackjackPlayer) => ({
      name: player.name,
      balance: player.balance,
    }))
    .sort((a: any, b: any) => b.balance - a.balance);
  const [article, setArticle] = useState<any>(null);
  const [percentage, setPercentage] = useState<any>(null);

  // Zaimportuj u góry:
  // import { useEffect } from "react";

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const refreshLesson = async () => {
        // 1) pobierz zawsze aktualne articlesData
        const freshArticles = await getArticlesData();
        if (!isActive) return;
        setArticlesData(freshArticles);

        // 2) oblicz next lesson i progress
        const next = await getNextUnmarkedItem(freshArticles);
        const perc = await getCompletionPercentage(freshArticles);

        if (!isActive) return;
        setArticle(next);
        setPercentage(perc);
      };

      refreshLesson();

      return () => {
        isActive = false;
      };
    }, [])
  );

  if (Platform.OS === "android") {
    NavigationBar.setVisibilityAsync("hidden");
    SystemNavigationBar.navigationHide();
  }

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), loaderTime);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { flex: 1 }]}>
        <ScrollView
          ref={(ref) => {
            scrollRef.current = ref;
          }}
          contentContainerStyle={[styles.scrollContainer, { flexGrow: 1 }]}
        >
          <View style={styles.header}>
            <Image
              source={require("../../../assets/icons/logo.png")}
              style={styles.logo}
            />
            <CopilotStep
              order={1}
              text={
                language === "pl"
                  ? "Witamy w Stacked! Nazywam się James i przeprowadzę cię przez naszą aplikację."
                  : "Welcome in Stacked! My name is James and I'll guide you through our app."
              }
              name="dealerHello"
            >
              <CopilotText style={styles.text}>
                {language === "pl"
                  ? "Witaj betatesterze!"
                  : "Hello betatester!"}
              </CopilotText>
            </CopilotStep>
          </View>
          {/* Load Saved Game Panel */}
          <CopilotStep
            name="dealerExplain"
            text={
              language === "pl"
                ? "Z tego miejsca możesz kontynuować ostatnią grę. Ostatnie gry są zapisywane automatycznie. O zapisywaniu konkretnych gier wspomnę w zakładce 'Graj'."
                : "Here you can continue last saved game. Last games are automatically saved. I'll mention saving specific games in the 'Play' tab."
            }
            order={2}
          >
            <CopilotView style={styles.panel}>
              <View style={styles.gameHeader}>
                <Text style={styles.gameTitle}>
                  {language === "pl"
                    ? `♠ Kontynuuj ostatnią grę ${
                        hasLastGame ? "(" + lastGame.gameType + ")" : ""
                      }`
                    : `♠ Continue Last Game ${
                        hasLastGame ? "(" + lastGame.gameType + ")" : ""
                      }`}
                </Text>
              </View>
              {hasLastGame && (
                <>
                  {(players?.slice(0, 5) || []).map(
                    (player: Player | BlackjackPlayer, index: number) => (
                      <View
                        key={player.name + index}
                        style={styles.playerRow}
                      >
                        <Text style={styles.playerIndex}>{index + 1}.</Text>
                        <Text style={styles.playerName}>{player.name}</Text>
                        <Text style={styles.playerScore}>
                          {player.balance}
                        </Text>
                      </View>
                    )
                  )}

                  {players && players.length > 5 && (
                    <Text style={styles.morePlayersText}>
                      {language === "pl"
                        ? `(+${players.length - 5} więcej...)`
                        : `(+${players.length - 5} more...)`}
                    </Text>
                  )}

                  <TouchableOpacity
                    style={styles.resumeButton}
                    onPress={() => {
                      (navigator as any).navigate(
                        lastGame.gameType === "Poker"
                          ? "PokerGame"
                          : "BlackjackGame",
                        {
                          playersCount: lastGame.players.length,
                          loadGame: true,
                        }
                      );
                    }}
                  >
                    <Ionicons name="play" size={16} color="#1c1c1c" />
                    <Text style={styles.resumeText}>
                      {language === "pl" ? "Wznów" : "Resume"}
                    </Text>
                  </TouchableOpacity>
                </>
              )}

              {!hasLastGame && (
                <View style={{ padding: 10 }}>
                  <View style={{ position: "relative" }}>
                    <Image
                      source={require("../../../assets/dealer/dealerConfused.png")}
                      style={{
                        width: "100%",
                        resizeMode: "contain",
                        height: 120,
                      }}
                    ></Image>
                    <View
                      style={{
                        ...StyleSheet.absoluteFillObject,
                        backgroundColor: "rgba(42,42,42,0.5)",
                      }}
                    ></View>
                  </View>
                  <Text
                    style={[
                      styles.panelText,
                      {
                        textAlign: "center",
                        marginVertical: 10,
                        color: "gray",
                      },
                    ]}
                  >
                    {language === "pl"
                      ? "Brak zapisanych gier"
                      : "No saved games."}
                  </Text>
                </View>
              )}
            </CopilotView>
          </CopilotStep>
          <CopilotStep
            name="dealer2"
            text={
              language === "pl"
                ? "To jest twój całkowity postęp w czytaniu naszych artykułów. Traktujemy artykuł jako przeczytany jeśli jest polubiony."
                : "This is Your total progress in reading our articles. We count article as read if it's liked."
            }
            order={3}
          >
            <CopilotView style={styles.panel}>
              <Image
                source={require("../../../assets/icons/logoAcademy.png")}
                style={{
                  width: "50%",
                  height: 50,
                  resizeMode: "contain",
                  alignSelf: "center",
                  margin: 5,
                }}
              ></Image>
              <Text style={styles.panelTitle}>
                {language === "pl" ? "Postęp nauki" : "Total progress"}
              </Text>
              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBar,
                    { width: `${percentage}%` as DimensionValue },
                  ]}
                />
              </View>
              <Text style={styles.panelText}>
                {`${percentage}%`}{" "}
                {language === "pl" ? "ukończonych artykułów" : "complete"}
              </Text>
            </CopilotView>
          </CopilotStep>

          {/* 📝 Lesson Panel */}

          <CopilotView style={styles.lessonPanel}>
            <Text style={styles.panelTitle}>
              {language === "pl"
                ? "📝 Twoja następna lekcja"
                : "📝 Your next lesson"}
            </Text>

            {article != null && (
              <View style={styles.lessonBody}>
                <Text style={styles.lessonDate}>{article.date}</Text>
                <View style={styles.lessonTitleRow}>
                  {/* <Ionicons
                    name="book"
                    size={20}
                    color="#cbbb93"
                    style={{ marginRight: 6 }}
                    /> */}
                  <Text style={styles.lessonTitle}>{article.title}</Text>
                  {/* <Ionicons
                    name="chevron-down"
                    size={20}
                    color="#777"
                    style={{ marginLeft: 6 }}
                    /> */}
                </View>
                <View
                  style={{
                    width: "100%",
                    // height: 200,
                    // backgroundColor: "red",
                  }}
                >
                  <Gif
                    source={article.bannerPath}
                    style={{
                      width: "90%",
                      height: 200,
                      alignSelf: "center",
                      borderRadius: 12,
                    }}
                    // contentFit="contain"
                  ></Gif>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={3}
                    style={{
                      width: "90%",
                      textAlign: "center",
                      alignSelf: "center",
                      margin: 10,
                      color: "white",
                      marginBottom: 20,
                    }}
                  >
                    {article.content}
                  </Text>
                  <TouchableOpacity
                    style={[styles.resumeButton, { alignSelf: "center" }]}
                    onPress={() =>
                      (navigator as any).navigate("Article", {
                        articleId: article.id,
                      })
                    }
                  >
                    <Ionicons name="play" size={16} color="#1c1c1c" />
                    <Text style={styles.buttonText}>
                      {language === "pl" ? "Kontynuuj" : "Continue"}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: "15%" }]} />
                  </View> */}
                {/* <Text style={styles.lessonProgressText}>Progress: 15%</Text> */}
              </View>
            )}
            {article === null && (
              <View style={{ position: "relative" }}>
                <Image
                  source={require("../../../assets/dealer/dealerHappy.png")}
                  style={{
                    width: "100%",
                    resizeMode: "contain",
                    height: 120,
                  }}
                ></Image>
                <Text
                  style={[
                    styles.panelText,
                    {
                      textAlign: "center",
                      marginVertical: 10,
                      color: "gray",
                    },
                  ]}
                >
                  {language === "pl"
                    ? "Wysztkie lekcje ukończone!"
                    : "All lessons completed!"}
                </Text>
                <View
                  style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: "rgba(42,42,42,0.5)",
                  }}
                ></View>
              </View>
            )}
          </CopilotView>

          <View style={styles.panel}>
            <Text style={styles.panelTitle}>
              {language === "pl" ? "📖 Losowe pojęcie" : "📖 Random Term"}
            </Text>
            {term ? (
              <>
                <Text style={styles.termTitle}>{term.term}</Text>
                <Text style={styles.termDefinition}>{term.definition}</Text>
              </>
            ) : (
              <></>
            )}
          </View>

          {/* ⚡ Quick Links Panel */}
          <CopilotView style={styles.quickLinksPanel}>
            <Text style={styles.panelTitle}>
              {language === "pl" ? "Szybki dostęp" : "Quick Access"}
            </Text>

            <View style={styles.quickLinksRow}>
              <TouchableOpacity
                style={styles.quickLinkButton}
                onPress={() => (navigator as any).navigate("Feedback")}
              >
                <Ionicons name="chatbubbles" size={20} color="#cbbb93" />
                <Text style={styles.quickLinkText}>
                  {language === "pl" ? "Opinia" : "Feedback"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.quickLinkButton}
                onPress={() =>
                  (navigator as any).navigate("MainTabs", {
                    screen: "Play",
                  })
                }
              >
                <Ionicons name="game-controller" size={20} color="#cbbb93" />
                <Text style={styles.quickLinkText}>
                  {language === "pl" ? "Graj" : "Play"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.quickLinkButton}
                onPress={() => (navigator as any).navigate("ReportBug")}
              >
                <Ionicons name="bug" size={20} color="#cbbb93" />
                <Text style={styles.quickLinkText}>
                  {language === "pl" ? "Zgłoś błąd" : "Bug report"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.quickLinkButton}
                onPress={() => (navigator as any).navigate("Saves")}
              >
                <Ionicons name="folder" size={20} color="#cbbb93" />
                <Text style={styles.quickLinkText}>
                  {language === "pl" ? "Zapisy" : "Saves"}
                </Text>
              </TouchableOpacity>
            </View>
          </CopilotView>

          <View style={styles.footer}>
            <Text style={styles.footerText}>2025 Stacked.</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  header: {
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  logo: {
    width: screenWidth * 0.25,
    height: screenWidth * 0.25,
    resizeMode: "contain",
  },
  text: {
    color: "white",
    width: "100%",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  panel: {
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    // shadowColor: "#f8f5ef",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.17,
    // shadowRadius: 2.54,
    // elevation: 3,
  },
  panelTitle: {
    fontSize: 18,
    color: "#cbbb93",
    fontWeight: "700",
    marginBottom: 8,
  },
  panelText: {
    color: "#ddd",
    fontSize: 15,
    marginBottom: 6,
  },
  continueButton: {
    backgroundColor: "#cbbb93",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 8,
    alignItems: "center",
  },
  streakButton: {
    backgroundColor: "#ff7f50",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#1c1c1c",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    width: "100%",
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: "#444",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#cbbb93",
  },
  termTitle: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    padding: 10,
  },
  termDefinition: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 4,
    lineHeight: 18,
    textAlign: "center",
    fontStyle: "italic",
  },
  savePreview: {
    backgroundColor: "#1c1c1c",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
    marginBottom: 10,
  },
  saveText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },
  saveTimestamp: {
    color: "#aaa",
    fontSize: 13,
  },

  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    color: "gray",
    fontSize: 16,
    textAlign: "center",
  },
  lessonPanel: {
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    // shadowColor: "#f8f5ef",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.17,
    // shadowRadius: 2.54,
    // elevation: 3,
  },
  lessonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  lessonDate: {
    color: "#aaa",
    fontSize: 14,
    textAlign: "center",
    width: "90%",
    alignSelf: "center",
    padding: 10,
  },
  lessonContinueButton: {
    alignSelf: "center",
    // flex: 1,
    flexDirection: "row",
    // alignContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#cbbb93",
    paddingVertical: 8,
    width: "30%",
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  lessonBody: {
    paddingTop: 4,
  },
  lessonTitleRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    width: "90%",
    alignSelf: "center",
  },
  lessonTitle: {
    fontSize: 17,
    color: "#fff",
    fontWeight: "600",
    width: "100%",
    textAlign: "center",
  },
  lessonProgressText: {
    color: "#ccc",
    fontSize: 14,
    marginTop: 6,
  },
  gamePanel: {
    backgroundColor: "#2a2a2a",
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  gameHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  gameTitle: {
    fontSize: 18,
    color: "#cbbb93",
    fontWeight: "700",
  },
  playerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: "#333",
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
    fontWeight: "600",
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
  quickLinksPanel: {
    // marginTop: 20,
    padding: 10,
  },

  quickLinksRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },

  quickLinkButton: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    width: screenWidth / 5,
  },

  quickLinkText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  morePlayersText: {
    fontSize: 14,
    color: "#999999",
    marginVertical: 4,
    textAlign: "center",
  },
});

export default withCopilotProvider(HomeScreen);
