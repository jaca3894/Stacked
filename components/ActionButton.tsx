import { StyleSheet, TouchableHighlight, Text } from "react-native"

interface ActionButtonProps {
  text: string;
  onPress: () => void;
}

const ActionButton = ({ text, onPress }: ActionButtonProps) => {
  return (
    <TouchableHighlight style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
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