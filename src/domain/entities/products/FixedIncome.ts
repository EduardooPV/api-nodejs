import { RiskLevel } from '../../value-objects/RiskLevel';
import { Product } from '../products/Products';

class FixedIncome extends Product {
  private maturityDate: Date;

  constructor(name: string, riskLevel: RiskLevel, minInvestment: number, maturityDate: Date) {
    super(name, riskLevel, minInvestment);
    this.maturityDate = maturityDate;
  }

  getDetails(): string {
    return `
      ${this.name}, 
      ${this.riskLevel},
      ${this.minInvestment}
      ${this.maturityDate}
    `;
  }
}

export { FixedIncome };
