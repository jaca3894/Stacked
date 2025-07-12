import { getNextUnmarkedItem } from "../../../utils/FindUnlikedArticle";
import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import LoadingPanel from "../../panels/LoadingPanel";
import * as NavigationBar from "expo-navigation-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import { Image as Gif } from "expo-image";
import { articlesData } from "../../../classes/Database";

const screenWidth = Math.round(Dimensions.get("window").width);

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  type Item = { id: string; date: string };
  const [hasLastGame, setHasLastGame] = useState(true);
  // const [hasNextLesson, setHasNextLesson] = useState(true);
  const loaderTime = 1000;

  // const article = getNextUnmarkedItem(articlesData);
  // setArticle(getNextUnmarkedItem(articlesData));
  const players = [
    { name: "Kon", score: 5200 },
    { name: "Jaca", score: 5100 },
    { name: "Qczer", score: 5000 },
    { name: "Burkard", score: 3750 },
    { name: "Fran", score: 2590 },
    { name: "Fryc", score: 1600 },
    { name: "Lukasz", score: 700 },
    { name: "Seweryn", score: 300 },
  ];
  const [article, setArticle] = useState<any>(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchArticle = async () => {
        const nextArticle = await getNextUnmarkedItem(articlesData);
        setArticle(nextArticle);
      };
      // console.log(article);
      fetchArticle();
    }, [])
  );

  if (Platform.OS === "android") {
    NavigationBar.setVisibilityAsync("hidden");
  }

  useEffect(() => {
    // const next = getNextUnmarkedItem(articlesData);
    // setArticle(next);
    // console.log(next);
    // getFirstUnlikedArticle();
    const timer = setTimeout(() => setLoading(false), loaderTime);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <LoadingPanel visible={loading} />}
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Animatable.View
              style={styles.header}
              animation="fadeIn"
              delay={1500}
              duration={1500}
            >
              <Image
                source={require("../../../assets/logo/logo.png")}
                style={styles.logo}
              />
              <Text style={styles.text}>Hello, betatester!</Text>
            </Animatable.View>
            {/* Load Saved Game Panel */}
            <View style={styles.panel}>
              <View style={styles.gameHeader}>
                <Text style={styles.gameTitle}>♠ Continue Last Game</Text>
              </View>
              {hasLastGame && (
                <>
                  {players.map((player, index) => (
                    <View key={player.name} style={styles.playerRow}>
                      <Text style={styles.playerIndex}>{index + 1}.</Text>
                      <Text style={styles.playerName}>{player.name}</Text>
                      <Text style={styles.playerScore}>{player.score}</Text>
                    </View>
                  ))}

                  <TouchableOpacity style={styles.resumeButton}>
                    <Ionicons name="play" size={16} color="#1c1c1c" />
                    <Text style={styles.resumeText}>Resume</Text>
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
                    No saved games.
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.panel}>
              <Image
                source={require("../../../assets/logo/logoAcademy.png")}
                style={{
                  width: "50%",
                  height: 50,
                  resizeMode: "contain",
                  alignSelf: "center",
                  margin: 5,
                }}
              ></Image>
              <Text style={styles.panelTitle}>Total progress</Text>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: "68%" }]} />
              </View>
              <Text style={styles.panelText}>68% complete</Text>
            </View>

            {/* 📝 Lesson Panel */}
            <View style={styles.lessonPanel}>
              <Text style={styles.panelTitle}>📝 Your next lesson</Text>

              {article != null && (
                <>
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
                      >
                        <Ionicons name="play" size={16} color="#1c1c1c" />
                        <Text style={styles.buttonText}>Continue</Text>
                      </TouchableOpacity>
                    </View>

                    {/* <View style={styles.progressBarContainer}>
                      <View style={[styles.progressBar, { width: "15%" }]} />
                    </View> */}
                    {/* <Text style={styles.lessonProgressText}>Progress: 15%</Text> */}
                  </View>
                </>
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
                    All lessons completed!
                  </Text>
                  <View
                    style={{
                      ...StyleSheet.absoluteFillObject,
                      backgroundColor: "rgba(42,42,42,0.5)",
                    }}
                  ></View>
                </View>
              )}
            </View>

            <View style={styles.panel}>
              <Text style={styles.panelTitle}>📖 Term of the Day</Text>
              <Text style={styles.termTitle}>Split</Text>
              <Text style={styles.termDefinition}>
                A move in Blackjack where a player divides two cards of equal
                value into two separate hands.
              </Text>
            </View>
            {/* ⚡ Quick Links Panel */}
            <View style={styles.quickLinksPanel}>
              <Text style={styles.panelTitle}>Quick Access</Text>

              <View style={styles.quickLinksRow}>
                <TouchableOpacity style={styles.quickLinkButton}>
                  <Ionicons name="chatbubbles" size={20} color="#cbbb93" />
                  <Text style={styles.quickLinkText}>Feedback</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.quickLinkButton}>
                  <Ionicons name="game-controller" size={20} color="#cbbb93" />
                  <Text style={styles.quickLinkText}>Play</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.quickLinkButton}>
                  <Ionicons name="bug" size={20} color="#cbbb93" />
                  <Text style={styles.quickLinkText}>Bug report</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.quickLinkButton}>
                  <Ionicons name="folder" size={20} color="#cbbb93" />
                  <Text style={styles.quickLinkText}>Saves</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>2025 Stacked.</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
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
});

export default HomeScreen;
