import { Investor } from './domain/entities/Investor';
import { RiskProfile } from './domain/value-objects/RiskProfile';

const duds = new Investor('Duds', '12312312312', 'duds@gmail.com', RiskProfile.Moderate);

console.log(duds.introduce());
console.log(duds.personalInfo());
