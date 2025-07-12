import { glossaryData } from "../classes/Database";
export const getRandomGlossaryTerm = () => {
  // Spłaszcz wszystkie pojęcia w jedną listę
  const flatList = glossaryData.flatMap((category) => category.data);

  // Losuj jeden
  const randomIndex = Math.floor(Math.random() * flatList.length);
  return flatList[randomIndex];
};
