import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { patchNotesData } from "../../../classes/Database"; // dostosuj ścieżkę
import * as Animatable from "react-native-animatable";

const screenHeight = Dimensions.get("screen").height;

const PatchNotesScreen = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.heading}>📦 Patch Notes</Text>
          {patchNotesData.map((note) => (
            <Animatable.View
              animation="fadeIn"
              duration={1500}
              key={note.version}
              style={styles.noteBlock}
            >
              <Text style={styles.version}>
                Version {note.version}{" "}
                <Text style={styles.date}>{note.date}</Text>
              </Text>

              {note.description?.length > 0 && (
                <Text style={styles.description}>{note.description}</Text>
              )}

              {note.changes.map((change, index) => (
                <Text key={index} style={styles.change}>
                  • {change}
                </Text>
              ))}
            </Animatable.View>
          ))}
          <View style={styles.footer}>
            <Text style={styles.footerText}>2025 Stacked.</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
  },
  content: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#cbbb93",
    marginBottom: 30,
    textAlign: "center",
  },
  noteBlock: {
    marginBottom: 28,
  },
  version: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 6,
  },
  date: {
    fontSize: 14,
    color: "#888",
  },
  change: {
    fontSize: 15,
    color: "#ddd",
    marginLeft: 8,
    marginBottom: 4,
  },
  description: {
    fontSize: 15,
    color: "#aaa",
    fontStyle: "italic",
    marginBottom: 10,
    marginLeft: 4,
  },
  footer: {
    height: screenHeight * 0.1,
    backgroundColor: "#1c1c1c",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "gray",
    fontSize: 16,
    textAlign: "center",
  },
});

export default PatchNotesScreen;
