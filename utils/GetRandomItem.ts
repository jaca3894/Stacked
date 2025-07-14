import { getGlossaryData } from "../classes/Database";
type GlossaryEntry = { term: string; definition: string };

export const getRandomGlossaryTerm = async (): Promise<GlossaryEntry> => {
  // 1) pobierz dynamiczne dane
  const groups = await getGlossaryData();

  // 2) spłaszcz wszystkie terminy
  const flatList: GlossaryEntry[] = groups.flatMap((group) => group.data);

  // 3) losuj
  const randomIndex = Math.floor(Math.random() * flatList.length);
  return flatList[randomIndex];
};
