export default class Player {
  public name: string;
  public balance: number;
  public isDealer: boolean;
  public currentBet: number;
  public folded: boolean;
  public lastAmount: number;
  public lastAction: "" | "call" | "check" | "raise" | "fold" | "SB" | "BB" | "All-in";
  constructor(name: string = '', balance: number = 1000) {
    this.name = name
    this.balance = balance
    this.currentBet = 0;
    this.isDealer = false;
    this.folded = false;
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
    this.folded = true;
  }
  setLastAction(action: "" | "call" | "check" | "raise" | "fold" | "SB" | "BB" | "All-in") {
    this.lastAction = action
  }

  static fromPlainObject(obj: any): Player {
    // 1. Create a new, real instance of the class
    const playerInstance = new Player(obj.name, obj.balance);

    // 2. Copy the saved data onto the new instance
    playerInstance.currentBet = obj.currentBet || 0;
    playerInstance.isDealer = obj.isDealer || false;
    playerInstance.folded = obj.folded || false;
    playerInstance.lastAmount = obj.lastAmount || 0;
    playerInstance.lastAction = obj.lastAction || '';
    
    // 3. Return the fully-functional instance
    return playerInstance;
  }
}