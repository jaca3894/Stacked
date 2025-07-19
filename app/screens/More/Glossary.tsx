import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { getGlossaryData } from "../../../classes/Database";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { useLanguage } from "../../../hooks/useLanguage";

const screenHeight = Dimensions.get("screen").height;

type GlossaryEntry = {
  term: string;
  definition: string;
};

type GlossaryGroup = {
  title: string;
  data: GlossaryEntry[];
};

const GlossaryScreen = () => {
  const { language } = useLanguage();
  const [search, setSearch] = useState("");
  const [collapsedSections, setCollapsedSections] = useState<string[]>([]);
  const [glossaryData, setGlossaryData] = useState<GlossaryGroup[] | null>(
    null
  );
  const animationsRef = useRef<Record<string, Animated.Value>>({});
  const navigation = useNavigation();

  // 1. Pobierz dane
  useEffect(() => {
    getGlossaryData().then((data) => {
      setGlossaryData(data);
      const anims: Record<string, Animated.Value> = {};
      data.forEach((section) => {
        anims[section.title] = new Animated.Value(1);
      });
      animationsRef.current = anims;
    });
  }, []);

  const isSearching = search.trim().length > 0;
  const handleSearch = (text: string) => setSearch(text);

  // 2. Zbiera ręcznie pasujące pozycje bez flatMap
  const getFilteredItems = () => {
    if (!glossaryData) return [];
    const results: { term: string; definition: string; section: string }[] = [];
    const lowerSearch = search.toLowerCase();

    glossaryData.forEach((section) => {
      section.data.forEach((item) => {
        const term = item.term.toLowerCase();
        const def = item.definition.toLowerCase();
        if (term.includes(lowerSearch) || def.includes(lowerSearch)) {
          results.push({
            term: item.term,
            definition: item.definition,
            section: section.title,
          });
        }
      });
    });

    return results;
  };

  const filteredItems = getFilteredItems();

  // 3. Toggle sekcji
  const toggleSection = (title: string) => {
    const isCollapsed = collapsedSections.includes(title);
    const nextValue = isCollapsed ? 1 : 0;

    setCollapsedSections((prev) =>
      isCollapsed ? prev.filter((t) => t !== title) : [...prev, title]
    );

    Animated.timing(animationsRef.current[title], {
      toValue: nextValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // 4. Loader
  if (!glossaryData && !isSearching) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Text style={styles.loadingText}>Ładowanie słowniczka…</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // 5. Render
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image
            source={require("../../../assets/arrowRight.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <Image
          source={require("../../../assets/icons/logo.png")}
          style={styles.logo}
        />

        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder={
            language === "pl" ? "Szukaj pojęć..." : "Search terms..."
          }
          placeholderTextColor="#777"
          style={styles.searchInput}
        />

        <ScrollView contentContainerStyle={styles.content}>
          {isSearching ? (
            filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <View
                  key={`${item.section}-${item.term}`}
                  style={styles.termBlock}
                >
                  <Text style={styles.term}>{item.term}</Text>
                  <Text style={styles.definition}>{item.definition}</Text>
                  <Text style={styles.sectionLabel}>{item.section}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noResults}>{"Brak wyników."}</Text>
            )
          ) : (
            glossaryData!.map((section) => {
              const isCollapsed = collapsedSections.includes(section.title);
              const anim = animationsRef.current[section.title];
              const height = anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, section.data.length * 64],
              });

              return (
                <Animatable.View
                  key={section.title}
                  animation="fadeIn"
                  duration={500}
                >
                  <TouchableOpacity
                    onPress={() => toggleSection(section.title)}
                  >
                    <Text style={styles.sectionTitle}>
                      {isCollapsed ? "▶" : "▼"} {section.title}
                    </Text>
                  </TouchableOpacity>
                  <Animated.View
                    style={{
                      height,
                      overflow: "hidden",
                      opacity: anim,
                    }}
                  >
                    {section.data.map((item) => (
                      <View key={item.term} style={styles.termBlock}>
                        <Text style={styles.term}>{item.term}</Text>
                        <Text style={styles.definition}>{item.definition}</Text>
                      </View>
                    ))}
                  </Animated.View>
                </Animatable.View>
              );
            })
          )}
          <View style={styles.footer}>
            <Text style={styles.footerText}>2025 Stacked.</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default GlossaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
  },
  loadingText: {
    color: "#aaa",
    fontSize: 16,
    marginTop: 40,
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: "10%",
    left: "7%",
    zIndex: 2,
  },
  backIcon: {
    width: 20,
    height: 20,
    transform: [{ scaleX: -1 }],
  },
  logo: {
    width: "50%",
    height: "20%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  searchInput: {
    backgroundColor: "#2a2a2a",
    color: "#fff",
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#444",
  },
  content: {
    padding: 16,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#cbbb93",
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 10,
  },
  termBlock: {
    marginBottom: 14,
    paddingHorizontal: 5,
  },
  term: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  definition: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 2,
    lineHeight: 20,
  },
  sectionLabel: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
    fontStyle: "italic",
  },
  noResults: {
    color: "#777",
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
  },
  footer: {
    height: screenHeight * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "gray",
    fontSize: 16,
    textAlign: "center",
  },
});
