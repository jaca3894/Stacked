import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";

const SavesScreen = () => {
  const navigation = useNavigation();
  const [savesAmount, setSavesAmount] = useState(0);
  const { language } = useLanguage();

  useFocusEffect(
    useCallback(() => {
      
    }, [])
  );

  return (
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
      {savesAmount === 0 && (
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
    </View>
  );
};

export default SavesScreen;
