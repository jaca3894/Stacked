export type TranslatedRank = {
  pl: string;
  eng: string;
};

export type HandRank = {
  handType: TranslatedRank;
  value: number;
};

const handTypeTranslations: Record<string, TranslatedRank> = {
  "High card": { pl: "Wysoka karta", eng: "High card" },
  Pair: { pl: "Para", eng: "Pair" },
  "Two pair": { pl: "Dwie pary", eng: "Two pair" },
  "Three of a kind": { pl: "Trójka", eng: "Three of a kind" },
  Straight: { pl: "Strit", eng: "Straight" },
  Flush: { pl: "Kolor", eng: "Flush" },
  "Full house": { pl: "Ful", eng: "Full house" },
  "Four of a kind": { pl: "Kareta", eng: "Four of a kind" },
  "Straight flush": { pl: "Poker", eng: "Straight flush" },
  "Royal flush": { pl: "Poker królewski", eng: "Royal flush" },
};

export function handrank(cards: string[]): HandRank {
  const values = "23456789tjqka";
  const suits: Record<string, string[]> = {};
  const counts: Record<string, number> = {};

  for (const card of cards) {
    const [v, s] = [card[0].toLowerCase(), card[1]];
    counts[v] = (counts[v] || 0) + 1;
    suits[s] = (suits[s] || []).concat(v);
  }

  const sorted = Object.keys(counts).sort(
    (a, b) => counts[b] - counts[a] || values.indexOf(b) - values.indexOf(a)
  );
  const countsSorted = sorted.map((k) => counts[k]);

  const uniqueValues = Object.keys(counts)
    .map((v) => values.indexOf(v))
    .sort((a, b) => a - b);
  const isStraight = uniqueValues
    .concat(uniqueValues.includes(0) ? [13] : [])
    .some((_, i, arr) => i >= 4 && arr[i] - arr[i - 4] === 4);

  const flushSuit = Object.entries(suits).find(([_, vals]) => vals.length >= 5);
  if (flushSuit) {
    const flushCards = flushSuit[1];
    const flushIndexes = flushCards
      .map((v) => values.indexOf(v))
      .sort((a, b) => a - b);

    const royal = ["t", "j", "q", "k", "a"]
      .map((v) => values.indexOf(v))
      .sort((a, b) => a - b);
    const isRoyal = royal.every((r) => flushIndexes.includes(r));

    const isFlushStraight = flushIndexes
      .concat(flushIndexes.includes(0) ? [13] : [])
      .some((_, i, arr) => i >= 4 && arr[i] - arr[i - 4] === 4);

    if (isRoyal)
      return { handType: handTypeTranslations["Royal flush"], value: 9 };
    if (isFlushStraight)
      return { handType: handTypeTranslations["Straight flush"], value: 8 };
  }

  if (countsSorted[0] === 4)
    return { handType: handTypeTranslations["Four of a kind"], value: 7 };
  if (countsSorted[0] === 3 && countsSorted[1] === 2)
    return { handType: handTypeTranslations["Full house"], value: 6 };
  if (flushSuit) return { handType: handTypeTranslations["Flush"], value: 5 };
  if (isStraight)
    return { handType: handTypeTranslations["Straight"], value: 4 };
  if (countsSorted[0] === 3)
    return { handType: handTypeTranslations["Three of a kind"], value: 3 };
  if (countsSorted[0] === 2 && countsSorted[1] === 2)
    return { handType: handTypeTranslations["Two pair"], value: 2 };
  if (countsSorted[0] === 2)
    return { handType: handTypeTranslations["Pair"], value: 1 };

  return { handType: handTypeTranslations["High card"], value: 0 };
}
