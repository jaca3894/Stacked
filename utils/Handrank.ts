export type Rank =
  | "High card"        // Wysoka karta
  | "Pair"             // Para
  | "Two pair"         // Dwie pary
  | "Three of a kind"  // Trójka
  | "Straight"         // Strit
  | "Flush"            // Kolor
  | "Full house"       // Ful
  | "Four of a kind"   // Kareta
  | "Straight flush"   // Poker
  | "Royal flush";     // Poker królewski

export type HandRank = {
  handType: Rank;
  value: number;
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
    (a, b) =>
      counts[b] - counts[a] ||
      values.indexOf(b) - values.indexOf(a)
  );
  const countsSorted = sorted.map(k => counts[k]);

  const uniqueValues = Object.keys(counts)
    .map(v => values.indexOf(v))
    .sort((a, b) => a - b);
  const isStraight = uniqueValues
    .concat(uniqueValues.includes(0) ? [13] : [])
    .some((_, i, arr) => i >= 4 && arr[i] - arr[i - 4] === 4);

  const flushSuit = Object.entries(suits).find(([_, vals]) => vals.length >= 5);
  if (flushSuit) {
    const flushCards = flushSuit[1];
    const flushIndexes = flushCards.map(v => values.indexOf(v)).sort((a, b) => a - b);

    const royal = ["t", "j", "q", "k", "a"].map(v => values.indexOf(v)).sort((a, b) => a - b);
    const isRoyal = royal.every(r => flushIndexes.includes(r));

    const isFlushStraight = flushIndexes
      .concat(flushIndexes.includes(0) ? [13] : [])
      .some((_, i, arr) => i >= 4 && arr[i] - arr[i - 4] === 4);

    if (isRoyal) return { handType: "Royal flush", value: 9 };
    if (isFlushStraight) return { handType: "Straight flush", value: 8 };
  }

  if (countsSorted[0] === 4) return { handType: "Four of a kind", value: 7 };
  if (countsSorted[0] === 3 && countsSorted[1] === 2)
    return { handType: "Full house", value: 6 };
  if (flushSuit) return { handType: "Flush", value: 5 };
  if (isStraight) return { handType: "Straight", value: 4 };
  if (countsSorted[0] === 3) return { handType: "Three of a kind", value: 3 };
  if (countsSorted[0] === 2 && countsSorted[1] === 2)
    return { handType: "Two pair", value: 2 };
  if (countsSorted[0] === 2) return { handType: "Pair", value: 1 };

  return { handType: "High card", value: 0 };
}
