import React, { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import Slider from "@react-native-community/slider";

type SliderProps = {
  value: number;
  onValueChange: (value: number) => void;
  onAccept: () => void;
  minimumValue: number;
  maximumValue: number;
  step?: number;
}

const CustomSlider = ({value, onValueChange, onAccept, minimumValue, maximumValue,step = 1}: SliderProps) => {
  const [currValue, setCurrValue] = useState(value);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Wartość: {currValue}</Text>
      <Slider
        style={styles.slider}
        value={value}
        onValueChange={(val) => { onValueChange(val); setCurrValue(val); }}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        minimumTrackTintColor="#4CAF50"
        maximumTrackTintColor="#CCCCCC"
        thumbTintColor="#FFFFFF"
      />
      <TouchableHighlight onPress={onAccept} style={{ marginTop: 10, padding: 10, backgroundColor: '#22f', borderRadius: 5 }}>
        <Text style={{ color: '#000', textAlign: 'center' }}>Zatwierdź</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#121212',
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#fff',
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

export default CustomSlider;
