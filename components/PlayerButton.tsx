import { Dimensions, StyleSheet, TouchableHighlight, Text } from "react-native";
import { View } from "react-native-animatable";
import CardBackView from "./CardBackView";

const screenWidth = Dimensions.get("window").width;

interface PlayerButtonProps {
  isGameStarted: boolean;
  isCurrentPlayer: boolean;
  opacity?: number;
  isDealer?: boolean;
  name?: string;
  balance?: number;
  lastAction?: string;
  showLastAction?: boolean;
  addStyles?: any;
  cardsCount?: number;
  onPress: () => void;
}

const PlayerButton = ({ isGameStarted, isCurrentPlayer, opacity, isDealer, name, balance, lastAction, showLastAction, cardsCount, addStyles, onPress }: PlayerButtonProps) => {
  return (
    <View style={[styles.buttonContainer, { opacity: opacity ?? 1 }]}>
      <TouchableHighlight
        disabled={isGameStarted}
        style={[
          styles.button,
          addStyles,
          isCurrentPlayer && styles.currentPlayerHighlight,
        ]}
        underlayColor="#948870"
        onPress={onPress}
      >
        <View style={styles.buttonView}>
          {isDealer && (
            <View style={styles.dealerIcon}>
              <Text style={styles.dealerIconText}>D</Text>
            </View>
          )}
          <Text style={styles.buttonText} numberOfLines={2} ellipsizeMode="tail">{name ? `${name}\n${balance}` : '+'}</Text>
          {(isGameStarted && showLastAction) && (
            <View style={styles.blindView}>
              <Text style={styles.blindText}>{lastAction}</Text>
            </View>
          )}
        </View>
      </TouchableHighlight>
      {cardsCount && (
        <View style={styles.cardsContainer} pointerEvents="none">
          {Array.from({ length: cardsCount }).map((_, index) => (
            <View key={index+1} style={[styles.cardWrapper, { marginLeft: -5 }]}>
              <CardBackView width={20} height={40}/>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: screenWidth * 0.2,
    maxWidth: screenWidth * 0.35,
    backgroundColor: "#cbbb9c",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    outlineColor: "white",
    outlineWidth: 2,
    padding: 5,
    textAlign: "center",
    position: 'relative',
    zIndex: 1,
  },
  buttonView: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: 'relative'
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    textAlign: "center",
  },
  blindView: {
    backgroundColor: "#111",
    padding: 2,
    borderRadius: 5,
    minWidth: screenWidth * 0.2,
    maxWidth: screenWidth * 0.35,
  },
  blindText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    textTransform: "capitalize",
  },
  currentPlayerHighlight: {
    outlineColor: '#0066ff',
    outlineWidth: 3.5,
    transform: [{ scale: 1.05 }],
    elevation: 10,
  },
  cardsContainer: {
    position: 'absolute',
    bottom: '20%', // Pushes the cards down to peek out from the bottom
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    zIndex: 0, // Ensures cards are behind the button (which has zIndex 1)
  },
  cardWrapper: {
    height: 70,
    display: 'flex',
    gap: 0,
  },
  dealerIcon: {
    position: "absolute",
    top: -20,
    left: -20,
    backgroundColor: "white",
    borderRadius: 15, // A slightly squared circle can look nice
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#333'
  },
  dealerIconText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
})

export default PlayerButton;