import Player from "./Player";

export default class Pot {
  name: string;
  balance: number;
  playersNames: string[];
  winner?: Player;
  currentBetForAPlayer: number;
  constructor(playersNames: string[], name: string = 'Main Pot', balance: number = 0) {
    this.name = name
    this.balance = balance
    this.playersNames = playersNames;
    this.currentBetForAPlayer = 0;
  }
  add(amount: number) {
    if (amount <= 0) return;
    this.balance += amount;
  }
}