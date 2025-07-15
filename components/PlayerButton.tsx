import { StyleSheet, TouchableHighlight, Text, useWindowDimensions } from "react-native";
import { View } from "react-native-animatable";
import CardBackView from "./CardBackView";
import { useLanguage } from "../hooks/useLanguage";

const lastActionsTranslations = {
  call: "Sprawdź",
  check: "Czekaj",
  raise: "Podbij",
  fold: "Pas",
  hit: "Dobierz",
  stand: "Stój",
  blackjack: "Blackjack",
  double: "Podwój",
  insurance: "Ubezpieczenie",
  busted: "Spalony"
} as const;

interface PlayerButtonProps {
  isGameStarted: boolean;
  isCurrentPlayer: boolean;
  opacity?: number;
  disabled?: boolean;
  isDealer?: boolean;
  name?: string;
  balance?: number;
  lastAction?: string;
  showLastAction?: boolean;
  addStyles?: any;
  addPositionStyles?: any;
  cardsCount?: number;
  onPress: () => void;
}

const PlayerButton = ({ isGameStarted, isCurrentPlayer, opacity, disabled, isDealer, name, balance, lastAction, showLastAction, cardsCount, addStyles, addPositionStyles, onPress }: PlayerButtonProps) => {
  const { width: screenWidth } = useWindowDimensions();
  const { language } = useLanguage();

  const dynamicStyles = {
    button: {
      minWidth: screenWidth * 0.2,
      maxWidth: screenWidth * 0.35,
    },
    blindView: {
      minWidth: screenWidth * 0.2,
      maxWidth: screenWidth * 0.35,
    },
  };

  function formatNumberSimple(num: number): string {
    // 1. Pomnóż przez 100, aby przesunąć przecinek o 2 miejsca (123.456 -> 12345.6)
    // 2. Zaokrąglij do najbliższej liczby całkowitej (12345.6 -> 12346)
    // 3. Podziel z powrotem przez 100 (12346 -> 123.46)
    const roundedNumber = Math.round(num * 100) / 100;
    return roundedNumber.toString();
  }

  return (
    <View style={[styles.buttonContainer, addPositionStyles, { opacity: opacity ?? 1 }]}>
      <TouchableHighlight
        disabled={disabled}
        style={[
          styles.button,
          dynamicStyles.button,
          isCurrentPlayer && styles.currentPlayerHighlight,
          addStyles,
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
          <Text style={styles.buttonText} numberOfLines={2} ellipsizeMode="tail">{name ? `${name}\n${balance ? formatNumberSimple(balance) : 0}` : '+'}</Text>
          {(isGameStarted && showLastAction) && (
            <View style={[styles.blindView, dynamicStyles.blindView]}>
              {lastAction && <Text style={styles.blindText}>{language === "pl" ? lastActionsTranslations[lastAction as keyof typeof lastActionsTranslations] ?? lastAction : lastAction}</Text>}
            </View>
          )}
        </View>
      </TouchableHighlight>
      {!!cardsCount && (
        <View style={[styles.cardsContainer, { transform: [{ scale: isCurrentPlayer ? 1.2 : 1 }] }]} pointerEvents="none">
          {Array.from({ length: cardsCount }).map((_, index) => (
            <View key={index+1} style={[styles.cardWrapper, { marginLeft: -5 }]}>
              <CardBackView width={20 * (isCurrentPlayer ? 1.2 : 1)} height={40 * (isCurrentPlayer ? 1.2 : 1)}/>
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
    backgroundColor: "#121212",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    outlineColor: "#cbbb9c",
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
    color: "hsl(0, 0%, 90%)",
    fontSize: 14,
    textAlign: "center",
  },
  blindView: {
    backgroundColor: "#cbbb9c",
    padding: 2,
    borderRadius: 5,
  },
  blindText: {
    color: "#000",
    textAlign: "center",
    fontSize: 13,
    textTransform: "capitalize",
  },
  currentPlayerHighlight: {
    outlineColor: '#f00',
    outlineWidth: 3.5,
    transform: [{ scale: 1.2 }],
    elevation: 10,
  },
  cardsContainer: {
    position: 'absolute',
    bottom: '-4%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    zIndex: 0,
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
    borderRadius: 15,
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
    fontSize: 16,
    textAlign: "center",
  },
})

export default PlayerButton;