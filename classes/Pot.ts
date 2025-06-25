import Player from "./Player";

export default class Pot {
  name: string;
  balance: number;
  players: string[];
  winner?: Player;
  constructor(players: string[], name: string = 'Main Pot', balance: number = 0) {
    this.name = name
    this.balance = balance
    this.players = players;
  }
  add(amount: number) {
    if (amount <= 0) return;
    this.balance += amount;
  }
}