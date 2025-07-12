import AsyncStorage from "@react-native-async-storage/async-storage";

export type Item = { id: string; [key: string]: any };

export const getNextUnmarkedItem = async (
  data: Item[],
  keyPrefix = "article"
): Promise<Item | null> => {
  for (const item of data) {
    const key = `${keyPrefix}${item.id}`;
    console.warn(key);
    const value = await AsyncStorage.getItem(key);

    // 🪵 Logowanie klucza i jego wartości
    console.log(`🔍 Checking key: '${key}' | Value: ${value}`);

    if (value !== "true") {
      return item;
    }
  }

  return null;
};
