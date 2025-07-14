import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Linking } from "react-native";
import { creditsData as credits } from "../../../classes/Database";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

const screenHeight = Dimensions.get("screen").height;

const CreditsScreen = () => {
  const navigation = useNavigation();

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
        <ScrollView contentContainerStyle={styles.content}>
          {credits.map((section, index) => (
            <Animatable.View
              animation="fadeIn"
              duration={1000}
              key={index}
              style={{ marginTop: 24 }}
            >
              <Text style={styles.sectionTitle}>{section.title}</Text>
              {section.intro && (
                <Text style={styles.itemText}>{section.intro}</Text>
              )}
              {section.items != null &&
                section.items.map((item, i) =>
                  typeof item === "string" ? (
                    <Text key={i} style={styles.itemText}>
                      • {item}
                    </Text>
                  ) : (
                    <Text key={i} style={styles.itemText}>
                      •{" "}
                      <Text
                        style={styles.linkText}
                        onPress={() => Linking.openURL(item.link)}
                      >
                        {item.label}
                      </Text>
                      {item.suffix}
                    </Text>
                  )
                )}
            </Animatable.View>
          ))}

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
  content: {
    padding: 16,
    paddingTop: 0,
  },
  logo: {
    width: "50%",
    height: "20%",
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#cbbb93",
    fontWeight: "bold",
    marginBottom: 12,
  },
  itemText: {
    fontSize: 16,
    color: "#ddd",
    marginBottom: 8,
    paddingLeft: 8,
  },
  multiline: {
    lineHeight: 20,
  },
  footer: {
    height: screenHeight * 0.1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  footerText: {
    color: "gray",
    fontSize: 16,
    textAlign: "center",
  },
  linkText: {
    color: "#7faaff",
    textDecorationLine: "underline",
  },
});

export default CreditsScreen;
