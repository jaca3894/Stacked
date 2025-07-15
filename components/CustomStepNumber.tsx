import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useCopilot } from "react-native-copilot";

const getLanguage = async (): Promise<"pl" | "eng"> => {
  const lang = await AsyncStorage.getItem("@language");
  return lang === "pl" || lang === "eng" ? lang : "eng";
};

const CustomStepNumber: React.FC = async () => {
  const language = await getLanguage();
  const { currentStepNumber } = useCopilot();

  return (
    <View style={styles.container}>
      <Text style={styles.number}>
        {language === "pl" ? "Krok" : "Step"} {currentStepNumber ?? "?"}
      </Text>
    </View>
  );
};

export default CustomStepNumber;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    justifyContent: "center",
    width: "100%",
    // borderColor: "#cbbb93",
    // borderWidth: 1,
    alignSelf: "flex-start",
  },
  label: {
    color: "white",
    fontSize: 14,
    marginRight: 6,
    fontWeight: "bold",
  },
  number: {
    color: "#cbbb93",
    fontWeight: "bold",
    fontSize: 14,
  },
});
