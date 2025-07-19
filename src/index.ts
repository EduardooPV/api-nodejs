import { FixedIncome } from './domain/entities/FixedIncome';
import { RiskLevel } from './domain/value-objects/RiskLevel';

const fixedIncomeProduct = new FixedIncome('CDB', RiskLevel.Moderate, 1000, new Date());

console.log(fixedIncomeProduct.getDetails());

const fundsProduct = new FixedIncome('AMW', RiskLevel.High, 1000, new Date());

console.log(fundsProduct.getDetails());
