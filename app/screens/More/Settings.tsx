import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  Image,
} from "react-native";
import * as Updates from "expo-updates";
import { useLanguage } from "../../../hooks/useLanguage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

type Language = "pl" | "eng";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { language, setLanguage } = useLanguage();
  const [pendingLanguage, setPendingLanguage] = useState<Language>(language);

  // Synchronizujemy picker z aktualnym językiem
  useEffect(() => {
    setPendingLanguage(language);
  }, [language]);

  // Wywoływane przy zmianie w pickerze
  const onLanguageChange = (lang: Language) => {
    if (lang === language) {
      // Nie zmieniamy języka — komunikat opcjonalny
      Alert.alert(
        language === "pl" ? "Język już ustawiony" : "Language already selected",
        language === "pl"
          ? "Wybrany język jest już aktywny."
          : "The selected language is already active."
      );
      return;
    }

    setPendingLanguage(lang);

    Alert.alert(
      language === "pl" ? "Zmień język" : "Change language",
      language === "pl"
        ? `Czy na pewno chcesz przełączyć język na ${
            lang === "pl" ? "Polski" : "Angielski"
          }?`
        : `Are you sure you want to switch to ${
            lang === "pl" ? "Polish" : "English"
          }?`,
      [
        {
          text: language === "pl" ? "Anuluj" : "Cancel",
          style: "cancel",
          onPress: () => {
            setPendingLanguage(language);
          },
        },
        {
          text: language === "pl" ? "Tak" : "Yes",
          onPress: async () => {
            setLanguage(lang);
            Alert.alert(
              language === "pl" ? "Język zaktualizowany" : "Language updated",
              language === "pl"
                ? `Aktualny język: ${lang === "pl" ? "Polski" : "Angielski"}`
                : `Current language: ${lang === "pl" ? "Polish" : "English"}`
            );

            try {
              await Updates.reloadAsync();
            } catch (error) {
              console.error("App reload failed", error);
            }
          },
        },
      ]
    );
  };

  const replayTutorial = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const seenKeys = keys.filter((key) => key.startsWith("@hasSeen"));
      await AsyncStorage.multiRemove(seenKeys);
      const title = language === "pl" ? "Powiadomienie" : "Info";
      const message =
        language === "pl"
          ? "Przewodnik powtórzy się przy następnym otwarciu aplikacji."
          : "Tutorial will replay next time you open the app.";

      Alert.alert(title, message);

      // @ts-ignore
      // navigation.navigate("Home");
    } catch (error) {
      console.error("Błąd podczas resetowania tutoriali:", error);
      Alert.alert(
        language === "pl"
          ? "Wystąpił błąd podczas resetowania przewodnika."
          : "An error occurred while resetting the tutorial."
      );
    }
  };

  const resetProgress = async () => {
    Alert.alert(
      language === "pl" ? "Zresetuj postęp" : "Reset Progress",
      language === "pl"
        ? "Czy na pewno chcesz zresetować?"
        : "Are you sure you want to reset?",
      [
        { text: language === "pl" ? "Anuluj" : "Cancel", style: "cancel" },
        {
          text: language === "pl" ? "Resetuj" : "Reset",
          style: "destructive",
          onPress: async () => {
            const keys = await AsyncStorage.getAllKeys();
            const articleKeys = keys.filter((k) => k.startsWith("article"));
            await AsyncStorage.multiRemove(articleKeys);
            Alert.alert(
              language === "pl" ? "Progres zresetowany." : "Progress reset."
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          width: "100%",
          position: "absolute",
          top: "7%",
          left: "7%",
          zIndex: 2,
        }}
      >
        <Image
          source={require("../../../assets/arrowRight.png")}
          style={{
            width: 20,
            height: 20,
            transform: [{ scaleX: -1 }],
          }}
        />
        <Text style={styles.headerText}>
          {language === "pl" ? "Ustawienia" : "Settings"}
        </Text>
      </TouchableOpacity>

      {/* 🌐 Language Section */}
      <View style={[styles.section, { marginTop: "25%" }]}>
        <View style={styles.sectionTitleRow}>
          <Ionicons name="language" size={20} color="#cbbb93" />
          <Text style={styles.sectionTitle}>
            {language === "pl" ? "Język" : "Language"}
          </Text>
        </View>
        <Text style={styles.sectionDescription}>
          {language === "pl"
            ? "Wybierz preferowany język interfejsu aplikacji."
            : "Choose your preferred language for the app interface."}
        </Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={pendingLanguage}
            onValueChange={onLanguageChange}
            mode="dropdown"
            style={Platform.OS === "android" ? undefined : styles.picker}
          >
            <Picker.Item
              style={{ color: "gray" }}
              label="English 🇬🇧"
              value="eng"
            />
            <Picker.Item
              style={{ color: "gray" }}
              label="Polski 🇵🇱"
              value="pl"
            />
          </Picker>
        </View>
      </View>

      {/* 🔁 Replay Tutorial Section */}
      <View style={styles.section}>
        <View style={styles.sectionTitleRow}>
          <Ionicons name="reload-circle" size={20} color="#cbbb93" />
          <Text style={styles.sectionTitle}>
            {language === "pl" ? "Powtórz przewodnik" : "Replay Tutorial"}
          </Text>
        </View>
        <Text style={styles.sectionDescription}>
          {language === "pl"
            ? "Powtórz oprowadzenie po aplikacji."
            : "Restart the onboarding of our app."}
        </Text>
        <TouchableOpacity style={styles.button} onPress={replayTutorial}>
          <Text style={styles.buttonText}>
            {language === "pl" ? "Powtórz" : "Replay"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 🧹 Reset Progress Section */}
      <View style={styles.section}>
        <View style={styles.sectionTitleRow}>
          <Ionicons name="trash" size={20} color="#cbbb93" />
          <Text style={styles.sectionTitle}>
            {language === "pl"
              ? "Zresetuj postępy w Akademii"
              : "Reset Academy Progress"}
          </Text>
        </View>
        <Text style={styles.sectionDescription}>
          {language === "pl"
            ? "To usunie dane ukończenia lekcji dla każdego artykułu."
            : "This will erase your completion data for all lessons."}
        </Text>
        <TouchableOpacity style={styles.resetButton} onPress={resetProgress}>
          <Text style={styles.resetText}>
            {language === "pl" ? "Zresetuj postępy" : "Reset Progress"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Stacked © 2025</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1c1c1c", padding: 16 },

  headerText: {
    color: "white",
    width: "100%",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    position: "absolute",
  },

  section: {
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    color: "#cbbb93",
    fontSize: 18,
    fontWeight: "700",
  },
  sectionDescription: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 18,
  },
  pickerContainer: {
    backgroundColor: "#1c1c1c",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#555",
    overflow: "hidden",
  },
  picker: {
    height: 50,
    color: "#fff",
  },
  button: {
    backgroundColor: "#cbbb93",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#1c1c1c",
    fontWeight: "700",
    fontSize: 15,
  },
  resetButton: {
    backgroundColor: "#444",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  resetText: {
    color: "tomato",
    fontWeight: "bold",
    fontSize: 15,
  },
  footer: {
    marginTop: 10,
    alignItems: "center",
  },
  footerText: {
    color: "#777",
    fontSize: 13,
  },
});

export default SettingsScreen;
