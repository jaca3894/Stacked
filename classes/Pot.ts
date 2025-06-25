import Player from "./Player";

export default class Pot {
  name: string;
  balance: number;
  playersIndexes: number[];
  winner?: Player;
  constructor(playersIndexes: number[], name: string = 'Main Pot', balance: number = 0) {
    this.name = name
    this.balance = balance
    this.playersIndexes = playersIndexes;
  }
  add(amount: number) {
    if (amount <= 0) return;
    this.balance += amount;
  }
}