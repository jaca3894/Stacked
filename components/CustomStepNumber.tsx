import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useCopilot } from "react-native-copilot";
import { useLanguage } from "../hooks/useLanguage";

const CustomStepNumber: React.FC = () => {
  const { language } = useLanguage();
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
