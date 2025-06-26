import Player from "./Player";

export default class Pot {
  name: string;
  balance: number;
  playersNames: string[];
  winner?: Player;
  constructor(playersNames: string[], name: string = 'Main Pot', balance: number = 0) {
    this.name = name
    this.balance = balance
    this.playersNames = playersNames;
  }
  add(amount: number) {
    if (amount <= 0) return;
    this.balance += amount;
  }
}