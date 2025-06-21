export default class Player {
  name: string;
  money: number;
  constructor(name: string = '', money: number = 1000) {
    this.name = name
    this.money = money
  }
}