import { RiskLevel } from '../value-objects/RiskLevel';

abstract class Product {
  protected name: string;
  protected riskLevel: RiskLevel;
  protected minInvestment: number;

  constructor(name: string, riskLevel: RiskLevel, minInvestment: number) {
    this.name = name;
    this.riskLevel = riskLevel;
    this.minInvestment = minInvestment;
  }

  abstract getDetails(): string;
}

export { Product };
