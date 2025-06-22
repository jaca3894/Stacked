export default class Pot {
  name: string;
  balance: number;
  constructor(name: string = 'Main Pot', balance: number = 0) {
    this.name = name
    this.balance = balance
  }
  add(amount: number) {
    if (amount <= 0) return;
    this.balance += amount;
  }
}