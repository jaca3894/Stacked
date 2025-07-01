import Player from "./Player";

export default class Pot {
  name: string;
  balance: number;
  players: Player[];

  constructor(players: Player[], name: string = 'Main Pot', balance: number = 0) {
    this.name = name
    this.balance = balance
    this.players = players;
  }
  
  add(amount: number) {
    if (amount <= 0) return;
    this.balance += amount;
  }
}