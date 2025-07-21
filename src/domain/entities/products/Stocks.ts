import { RiskLevel } from '../../value-objects/RiskLevel';
import { Product } from './Products';

class Stocks extends Product {
  private ticker: string;

  constructor(name: string, riskLevel: RiskLevel, minInvestment: number, ticker: string) {
    super(name, riskLevel, minInvestment);
    this.ticker = ticker;
  }

  getDetails(): string {
    return `
      ${this.name}, 
      ${this.riskLevel},
      ${this.minInvestment}
      ${this.ticker}
    `;
  }
}

export { Stocks };
