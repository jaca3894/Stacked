export default class Player {
  public name: string;
  public balance: number;
  public isDealer: boolean;
  public currentBet: number;
  public didFold: boolean;
  public lastAmount: number;
  public lastAction: "" | "call" | "check" | "bet" | "raise" | "fold" | "SB" | "BB";
  constructor(name: string = '', balance: number = 1000) {
    this.name = name
    this.balance = balance
    this.currentBet = 0;
    this.isDealer = false;
    this.didFold = false;
    this.lastAmount = 0;
    this.lastAction = "";
  }
  give(amount: number) {
    if (amount <= 0) return;
    this.balance += amount;
  }
  take(amount: number) {
    if (amount <= 0) return;
    if (amount > this.balance) this.balance = 0;
    else this.balance -= amount;
    this.lastAmount = amount;
    this.currentBet += amount;
  }
  setBalance(balance: number) {
    this.balance = balance;
  }
  fold() {
    this.didFold = true;
  }
  setLastAction(action: "" | "call" | "check" | "bet" | "raise" | "fold" | "SB" | "BB") {
    this.lastAction = action
  }
}