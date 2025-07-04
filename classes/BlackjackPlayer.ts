import Card from "./Card";

export default class BlackjackPlayer {
  public name: string;
  public balance: number;
  public currentBet: number;
  public passed: boolean;
  public hand: Card[] = [];
  public stood: boolean = false;
  public isDealer: boolean = false;

  constructor(name: string = "", balance: number = 1000) {
    this.name = name;
    this.balance = balance;
    this.currentBet = 0;
    this.passed = false;
  }

  give(amount: number) {
    if (amount <= 0) return;
    this.balance += amount;
  }

  take(amount: number) {
    if (amount <= 0) return;
    if (amount > this.balance) this.balance = 0;
    else this.balance -= amount;
    this.currentBet += amount;
  }

  pass() {
    this.passed = true;
  }

  resetHand() {
    this.hand = [];
    // this.currentBet = 0;
    this.passed = false;
    this.stood = false;
  }

  addCard(card: Card) {
    this.hand.push(card);
  }

  getHandValue(): number[] {
    let totals = [0];
    for (const card of this.hand) {
      const values = card.getValue();
      const newTotals: number[] = [];

      for (const total of totals) {
        for (const val of values) {
          newTotals.push(total + val);
        }
      }

      totals = newTotals;
    }

    // Filtruj powyżej 21, jeśli można
    const valid = totals.filter((v) => v <= 21);
    return valid.length > 0 ? valid : [Math.min(...totals)];
  }

  isBusted(): boolean {
    return this.getHandValue().every((val) => val > 21);
  }

  hasBlackjack(): boolean {
    return this.hand.length === 2 && this.getHandValue().includes(21);
  }

  stand() {
    this.stood = true;
  }
}
