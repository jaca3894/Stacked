import React, { useState, useRef } from "react";
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
import { glossaryData } from "../../../classes/Database";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

// Expanded glossary data

const screenHeight = Dimensions.get("screen").height;

const GlossaryScreen = () => {
  const [search, setSearch] = useState("");
  const [collapsedSections, setCollapsedSections] = useState<string[]>([]);
  const animationsRef = useRef<Record<string, Animated.Value>>(
    initializeAnimations()
  );

  const navigation = useNavigation();

  function initializeAnimations() {
    const anims: Record<string, Animated.Value> = {};
    glossaryData.forEach((section) => {
      anims[section.title] = new Animated.Value(1);
    });
    return anims;
  }

  const handleSearch = (text: string) => setSearch(text);

  const toggleSection = (title: string, count: number) => {
    const isCollapsed = collapsedSections.includes(title);
    const nextValue = isCollapsed ? 1 : 0;

    if (isCollapsed) {
      setCollapsedSections((prev) => prev.filter((t) => t !== title));
    } else {
      setCollapsedSections((prev) => [...prev, title]);
    }

    Animated.timing(animationsRef.current[title], {
      toValue: nextValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const isSearching = search.trim().length > 0;
  const filteredFlat = glossaryData.flatMap((section) =>
    section.data
      .filter(
        (item) =>
          item.term.toLowerCase().includes(search.toLowerCase()) ||
          item.definition.toLowerCase().includes(search.toLowerCase())
      )
      .map((item) => ({ ...item, section: section.title }))
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            top: "10%",
            left: "7%",
            zIndex: 2,
          }}
        >
          <Image
            source={require("../../../assets/arrowRight.png")}
            style={{
              width: 20,
              height: 20,
              transform: [{ scaleX: -1 }],
            }}
          />
        </TouchableOpacity>
        <Image
          source={require("../../../assets/icons/logo.png")}
          style={styles.logo}
        />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search terms..."
          placeholderTextColor="#777"
          style={styles.searchInput}
        />
        <ScrollView contentContainerStyle={styles.content}>
          {isSearching ? (
            filteredFlat.length > 0 ? (
              filteredFlat.map((item) => (
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
              <Text style={styles.noResults}>No results found.</Text>
            )
          ) : (
            glossaryData.map((section) => {
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
                  duration={1000}
                >
                  <TouchableOpacity
                    onPress={() =>
                      toggleSection(section.title, section.data.length)
                    }
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
  content: {
    padding: 16,
    paddingTop: 0,
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
