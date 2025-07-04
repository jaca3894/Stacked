export type Suit = "hearts" | "diamonds" | "clubs" | "spades";
export type Rank =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K";

export default class Card {
  public suit: Suit;
  public rank: Rank;

  constructor(suit: Suit, rank: Rank) {
    this.suit = suit;
    this.rank = rank;
  }

  getValue(): number[] {
    if (this.rank === "A") return [1, 11];
    if (["J", "Q", "K"].includes(this.rank)) return [10];
    return [parseInt(this.rank)];
  }

  toString(): string {
    const symbols = {
      hearts: "♥",
      diamonds: "♦",
      clubs: "♣",
      spades: "♠",
    };
    return `${this.rank}${symbols[this.suit]}`;
  }
}
