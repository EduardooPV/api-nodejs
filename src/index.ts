import { Investor } from './domain/entities/Investor';
import { Email } from './domain/value-objects/Email';
import { RiskProfile } from './domain/value-objects/RiskProfile';

const email = new Email('lorem@asduh.com');
const duds = new Investor('Duds', '12312312312', email, RiskProfile.Moderate);

console.log(duds.cpf);
console.log(duds.introduce());
console.log(duds.personalInfo());
