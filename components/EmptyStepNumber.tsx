import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useCopilot } from "react-native-copilot";

const EmptyStepNumber: React.FC = () => {
  const { currentStepNumber } = useCopilot();

  return <></>;
};

export default EmptyStepNumber;
