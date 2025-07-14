import AsyncStorage from "@react-native-async-storage/async-storage";

export type Item = { id: string; [key: string]: any };

export const getNextUnmarkedItem = async (
  data: Item[],
  keyPrefix = "article"
): Promise<Item | null> => {
  for (const item of data) {
    const key = `${keyPrefix}${item.id}`;
    const value = await AsyncStorage.getItem(key);
    if (value !== "true") 
      return item;
  }

  return null;
};

export const getCompletionPercentage = async (
  data: Item[],
  keyPrefix = "article"
): Promise<number> => {
  let completed = 0;

  for (const item of data) {
    const key = `${keyPrefix}${item.id}`;
    const value = await AsyncStorage.getItem(key);

    if (value === "true") {
      completed++;
    }
  }

  const percent = data.length > 0 ? Math.round((completed / data.length) * 100) : 0;
  return percent;
};
