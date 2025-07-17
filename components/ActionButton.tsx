import { StyleSheet, TouchableHighlight, Text } from "react-native"

interface ActionButtonProps {
  text: string;
  disabled?: boolean;
  opacity?: number;
  addButtonStyle?: any;
  addTextStyle?: any;
  onPress: () => void;
}

const ActionButton = ({ text, disabled, opacity, addButtonStyle, addTextStyle, onPress }: ActionButtonProps) => {
  return (
    <TouchableHighlight style={[styles.button, addButtonStyle, { opacity: opacity }]} onPress={onPress} underlayColor="#948870" disabled={disabled}>
      <Text style={[styles.text, addTextStyle]}>{text}</Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#cbbb9c",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginVertical: 6,
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ActionButton;