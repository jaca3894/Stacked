import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Player from "../classes/Player";

interface GameSavePalenProps {
  title?: string;
  gameType: "Poker" | "Blackjack";
  players: Player[];
  language: "pl" | "eng";
  navigator: any;
  showDeleteButton?: boolean;
  onSave?: () => void;
  onDelete?: () => void;
}

const GameSavePanel = ({ title, gameType, players, language, navigator, showDeleteButton, onSave, onDelete }: GameSavePalenProps) => {
  // Derive a sorted list of players, just like in HomeScreen.
  // We use useMemo to avoid re-calculating on every render unless players change.
  const sortedPlayers = React.useMemo(() => 
    [...players].sort((a, b) => b.balance - a.balance), 
    [players]
  );

  const [showAll, setShowAll] = useState(false);

  if (players.length === 0) {
    return null; // Don't render anything if there are no players
  }

  return (
    <View style={styles.panel}>
      <View style={styles.gameHeader}>
        <Text style={styles.gameTitle}>
          {!!title && title}
          {!title && (language === "pl" ? "♠ Ostatnia gra" : "♠ Last Game")} {!title && `(${gameType})`}
        </Text>
      </View>
      
      {/* Map over the top 5 sorted players */}
      {(showAll ? sortedPlayers : sortedPlayers.slice(0, 5)).map((player, index) => (
        <View key={`${player.name}-${index}`} style={styles.playerRow}>
          <Text style={styles.playerIndex}>{index + 1}.</Text>
          <Text style={styles.playerName} numberOfLines={1}>{player.name}</Text>
          <Text style={styles.playerScore}>{player.balance}</Text>
        </View>
      ))}

      {/* Show how many more players there are */}
      {sortedPlayers.length > 5 && (
        <Text style={styles.morePlayersText} onPress={() => {setShowAll(prev => !prev)}}>
          {language === "pl" ? (showAll ? "Ukryj" : `(+${sortedPlayers.length - 5} więcej...)`) : (showAll ? "Hide" : `(+${sortedPlayers.length - 5} more...)`)}
        </Text>
      )}

      <View style={{flexDirection: 'row', gap: 10}}>
        {/* Resume Button */}
        <TouchableOpacity
          style={styles.resumeButton}
          onPress={() => {
            navigator.navigate(gameType === "Poker" ? "PokerGame" : "BlackjackGame", {
              playersCount: players.length,
              loadGame: true,
            });
          }}
        >
          <Ionicons name="play" size={16} color="#1c1c1c" />
          <Text style={styles.resumeText}>
            {language === "pl" ? "Wznów" : "Resume"}
          </Text>
        </TouchableOpacity>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, { marginLeft: 20 }]}
          onPress={onSave}
        >
          <Ionicons name="save" size={16} color="#cbbb93" />
          <Text style={styles.saveText}>
            {language === "pl" ? "Zapisz" : "Save"}
          </Text>
        </TouchableOpacity>

        {/* Delete Button */}
        {showDeleteButton && <TouchableOpacity
          style={styles.deleteButton}
          onPress={onDelete}
          >
          <Ionicons name="trash" size={18} color="#d00" />
          <Text style={styles.deleteText}>
            {language === "pl" ? "Usuń" : "Delete"}
          </Text>
        </TouchableOpacity>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  panel: {
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  gameHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  gameTitle: {
    fontSize: 18,
    color: "#cbbb93",
    fontWeight: "700",
  },
  playerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderColor: "#3a3a3a",
  },
  playerIndex: {
    color: "#aaa",
    fontWeight: "500",
    width: 24,
  },
  playerName: {
    color: "#fff",
    flex: 1,
    fontWeight: "600",
  },
  playerScore: {
    color: "#cbbb93",
    fontWeight: "700",
    fontSize: 16,
  },
  morePlayersText: {
    fontSize: 14,
    color: "#999999",
    marginTop: 8,
    textAlign: "right",
  },
  resumeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#cbbb93",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
    alignSelf: "flex-start",
  },
  resumeText: {
    color: "#1c1c1c",
    fontWeight: "600",
    fontSize: 15,
    marginLeft: 8,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
    outlineColor: '#cbbb93',
    outlineWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
    alignSelf: "flex-start",
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
    marginLeft: 8,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
    outlineColor: '#d00',
    outlineWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
    alignSelf: "flex-start",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
    marginLeft: 8,
  },
})

export default GameSavePanel;