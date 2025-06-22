export default class Player {
  public name: string;
  public balance: number;
  public isDealer: boolean;
  constructor(name: string = '', balance: number = 1000) {
    this.name = name
    this.balance = balance
    this.isDealer = false;
  }
  give(amount: number) {
    if (amount <= 0) return;
    this.balance += amount;
  }
  take(amount: number) {
    if (amount <= 0) return;
    if (amount > this.balance) this.balance = 0;
    else this.balance -= amount;
  }
}