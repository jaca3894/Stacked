import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { morePanelsData as data } from "../../classes/Database";
import Icon from "react-native-vector-icons/Ionicons";

const screenWidth = Math.round(Dimensions.get("window").width);

const MoreScreen = () => {
  const [activePanelIndex, setActivePanelIndex] = useState<number | null>(null);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../../assets/logo/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.flexContainer}>
          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => setActivePanelIndex(index)}
              activeOpacity={0.8}
            >
              <Icon
                name={item.iconName}
                size={36}
                color="#cbbb9c"
                style={styles.cardIcon}
              />
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#cbbb9c" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>2025 Stacked.</Text>
        </View>

        {activePanelIndex !== null && data[activePanelIndex] && (
          <Modal
            animationType="slide"
            visible
            onRequestClose={() => setActivePanelIndex(null)}
            presentationStyle="fullScreen"
          >
            {React.createElement(
              data[activePanelIndex].panel as React.ComponentType
            )}
          </Modal>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
  },
  header: {
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: screenWidth * 0.35,
    height: screenWidth * 0.35,
  },
  flexContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardIcon: {
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  cardSubtitle: {
    color: "#cccccc",
    fontSize: 14,
    marginTop: 2,
  },
  footer: {
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "gray",
    fontSize: 16,
  },
});

export default MoreScreen;
