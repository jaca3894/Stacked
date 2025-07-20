import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useLanguage = () => {
  const [language, setLanguageState] = useState<"pl" | "eng">("eng");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const stored = await AsyncStorage.getItem("@language");
      if (stored === "pl" || stored === "eng") {
        setLanguageState(stored);
        setIsLoading(false);
      } else {
        setLanguageState("eng");
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const setLanguage = useCallback(async (lang: "pl" | "eng") => {
    await AsyncStorage.setItem("@language", lang);
    setLanguageState(lang);
  }, []);

  return {
    language,
    setLanguage,
    isLoading
  };
};
