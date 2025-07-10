import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  GestureResponderEvent,
  Image,
  Dimensions,
} from "react-native";

import type { TooltipProps } from "react-native-copilot";
import { useCopilot } from "react-native-copilot";
import CustomStepNumber from "./CustomStepNumber";

const screenWidth = Dimensions.get("screen").width;

export const Tooltip = ({ labels }: TooltipProps) => {
  const { goToNext, goToPrev, stop, currentStep, isFirstStep, isLastStep } =
    useCopilot();

  return (
    <View style={styles.wrapper}>
      <View style={styles.tooltipContainer}>
        <CustomStepNumber />
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../assets/dealer/dealer.png")}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text testID="stepDescription" style={styles.tooltipText}>
              {currentStep?.text ?? "⏳ Ładowanie kroku..."}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomBar}>
        {!isLastStep && <TooltipButton onPress={stop} label={labels.skip!} />}
        {!isFirstStep && (
          <TooltipButton onPress={goToPrev} label={labels.previous!} />
        )}
        {!isLastStep ? (
          <TooltipButton onPress={goToNext} label={labels.next!} />
        ) : (
          <TooltipButton onPress={stop} label={labels.finish!} />
        )}
      </View>
    </View>
  );
};

const TooltipButton = ({
  onPress,
  label,
}: {
  onPress: (event: GestureResponderEvent) => void;
  label: string;
}) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

export default Tooltip;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#222",
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cbbb93",
    maxWidth: "100%",
    maxHeight: 280,
    alignSelf: "center",
  },
  tooltipContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  image: {
    width: "35%",
    height: 120,
    // aspectRatio: 1.5,
    resizeMode: "contain",
    marginBottom: 10,
  },
  textContainer: {
    width: "70%",
    marginBottom: 10,
    alignSelf: "center",
  },
  tooltipText: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    fontWeight: "500",
    flexShrink: 1,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flexWrap: "wrap",
    marginTop: 8,
    gap: 8,
  },
  button: {
    backgroundColor: "#333",
    borderColor: "#cbbb93",
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 4,
  },
  buttonText: {
    color: "#cbbb93",
    fontWeight: "bold",
    fontSize: 13,
  },
});
