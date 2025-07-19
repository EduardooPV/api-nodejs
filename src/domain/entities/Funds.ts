import { RiskLevel } from '../value-objects/RiskLevel';
import { Product } from './Product';

class Funds extends Product {
  private administrataxtionTax: Date;

  constructor(name: string, riskLevel: RiskLevel, minInvestment: number, maturityDate: Date) {
    super(name, riskLevel, minInvestment);
    this.administrataxtionTax = maturityDate;
  }

  getDetails(): string {
    return `
      ${this.name}, 
      ${this.riskLevel},
      ${this.minInvestment}
      ${this.administrataxtionTax}
    `;
  }
}

export { Funds };
