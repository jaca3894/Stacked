import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Image,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { getArticlesData, getSkillsData } from "../../../classes/Database";
import { Image as Gif } from "expo-image";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { CopilotStep, walkthroughable } from "react-native-copilot";
import { useCopilot } from "react-native-copilot";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { withCopilotProvider } from "../../../utils/WithCopilotProvider";
import React from "react";

const screenHeight = Math.round(Dimensions.get("window").height);
const CopilotView = walkthroughable(SafeAreaView);

const AcademyScreen = () => {
  const navigation = useNavigation<any>();
  // let globalIndex = useRef(0).current;

  const { start } = useCopilot();

  type SkillItem = {
    name: string;
    imagePath: any; // możesz użyć ImageSourcePropType jeśli chcesz precyzyjniej
  };

  type SkillCategory = {
    category: string;
    description: string;
    items: SkillItem[];
  };

  const [data, setData] = useState<SkillCategory[]>([]);

  useEffect(() => {
    getSkillsData().then(setData);
  }, []);

  const hasStartedTutorial = useRef(false);

  useFocusEffect(
    React.useCallback(() => {
      const checkTutorialFlag = async () => {
        try {
          const hasSeen = await AsyncStorage.getItem("@hasSeenAcademyTutorial");
          if (!hasSeen && !hasStartedTutorial.current) {
            hasStartedTutorial.current = true;

            // Odpalamy tutorial z opóźnieniem
            const timer = setTimeout(() => {
              start();
              AsyncStorage.setItem("@hasSeenAcademyTutorial", "true");
            }, 500);

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

  return (
    <CopilotView style={{ flex: 1, backgroundColor: "#1c1c1c" }}>
      <CopilotStep
        order={1}
        name="dealerLike"
        text="Here You can read articles about various topics. Leave a like on it if You enjoyed one!"
      >
        <CopilotView style={styles.header}>
          <Image
            source={require("../../../assets/icons/logoAcademy.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </CopilotView>
      </CopilotStep>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        {data.map((category, categoryIndex) => (
          <View key={categoryIndex + 1} style={styles.categoryBlock}>
            <Text style={styles.categoryTitle}>{category.category}</Text>
            <Text style={styles.categoryDescription}>
              {category.description}
            </Text>
            <FlatList
              data={category.items}
              keyExtractor={(_, index) => `${categoryIndex}-${index}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                const articleId = `${categoryIndex}-${index}`;
                return (
                  <TouchableHighlight
                    underlayColor={"transparent"}
                    onPress={() => {
                      navigation.navigate("Article", {
                        articleId,
                      });
                    }}
                  >
                    <View style={styles.skillItem}>
                      <Gif
                        source={item.imagePath}
                        style={styles.skillImage}
                        contentFit="cover"
                        transition={300}
                        cachePolicy="memory-disk"
                      />
                      <View style={styles.skillName}>
                        <Text style={styles.skillNameText}>{item.name}</Text>
                        <Image
                          source={require("../../../assets/arrowRight.png")}
                          style={{
                            width: 20,
                            height: 20,
                            position: "absolute",
                            right: 10,
                            top: 15,
                          }}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  </TouchableHighlight>
                );
              }}
            />
          </View>
        ))}
        <View style={styles.footer}>
          <Text style={styles.footerText}>2025 Stacked.</Text>
        </View>
      </ScrollView>
    </CopilotView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // borderWidth: 1,
    // borderColor: 'white',
    backgroundColor: "#1c1c1c",
  },
  header: {
    height: screenHeight * 0.2,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1c1c1c",
    alignItems: "center",
  },
  logo: {
    marginTop: "10%",
    width: "50%",
    height: "100%",
  },
  categoryBlock: {
    padding: 20,
    height: 350,
    width: "100%",
    // margin: "auto",
    // borderWidth: 2,
    // borderColor: 'white',
    backgroundColor: "#1c1c1c",
  },
  categoryTitle: {
    color: "white",
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryDescription: {
    color: "lightgrey",
    fontSize: 12,
    marginBottom: 20,
  },
  categoryScroll: {
    backgroundColor: "transparent",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  skillItem: {
    width: 250,
    height: 200,
    backgroundColor: "transparent",
    marginRight: 10,
    textAlign: "left",
    flexDirection: "column",
    justifyContent: "space-around",
    borderRadius: 10,
  },
  skillImage: {
    width: "100%",
    height: 150,
    backgroundColor: "lightgrey",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  skillName: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "#cbbb9c",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopWidth: 0,
  },
  skillNameText: {
    color: "white",
    fontSize: 16,
    lineHeight: 50,
    fontWeight: "bold",
    textAlign: "left",
    paddingLeft: 10,
  },
  footer: {
    height: screenHeight * 0.1,
    backgroundColor: "#1c1c1c",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "gray",
    fontSize: 16,
    textAlign: "center",
  },
});
export default withCopilotProvider(AcademyScreen);
