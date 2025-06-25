import { TouchableHighlight, Text, StyleSheet } from "react-native"

const RoundButton = ({text, func, mainColor, secondColor, opacity}: {text: string; func: () => void; mainColor: string; secondColor: string; opacity?: number}) => {
  return (
    <TouchableHighlight style={[styles.roundButton, {backgroundColor: mainColor, opacity: opacity ?? 1 }]} underlayColor={secondColor} onPress={func} disabled={opacity != undefined && opacity != 1}>
      <Text style={styles.roundButtonText}>{text}</Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  roundButton: {
    borderRadius: '50%',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 3,
  },
  roundButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default RoundButton;