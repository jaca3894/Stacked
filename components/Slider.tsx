import React, { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import Slider from "@react-native-community/slider";
import Svg, { Path } from "react-native-svg";
import { useLanguage } from "../hooks/useLanguage";


type SliderProps = {
  value: number;
  onValueChange: (value: number) => void;
  onAccept: () => void;
  onClose: () => void;
  minimumValue: number;
  maximumValue: number;
  step?: number;
};

const CustomSlider = ({
  value,
  onValueChange,
  onAccept,
  minimumValue,
  maximumValue,
  onClose,
  step = 1,
}: SliderProps) => {
  const [currValue, setCurrValue] = useState(value);
  const { language } = useLanguage();
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.closeButton}
        underlayColor="transparent"
        onPress={onClose}
      >
        <Svg viewBox="-1 -1 2 2" width={10} height={10}>
          <Path
            d="M -1 -1 L 1 1 M 1 -1 L -1 1"
            stroke="#fff"
            strokeWidth={0.2}
            strokeLinecap="round"
          />
        </Svg>
      </TouchableHighlight>
      <Text style={styles.label}>
        {language === "pl" ? "Wybierz stawkę: " : "Choose your bet:"}{" "}
        {currValue}
      </Text>
      <Slider
        style={styles.slider}
        value={value}
        onValueChange={(val) => {
          onValueChange(val);
          setCurrValue(val);
        }}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        minimumTrackTintColor="#4CAF50"
        maximumTrackTintColor="#CCCCCC"
        thumbTintColor="#FFFFFF"
      />
      <TouchableHighlight
        onPress={onAccept}
        style={{
          marginTop: 10,
          padding: 10,
          backgroundColor: "#22f",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "#000", textAlign: "center" }}>
          {language === "pl" ? "Zatwierdź" : "Confirm"}
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "75%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#121212",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#fff",
    textAlign: "center",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    color: "#ccc",
  },
});

export default CustomSlider;
