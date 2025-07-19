import { Email } from '../value-objects/Email';
import { RiskProfile } from '../value-objects/RiskProfile';

class Investor {
  name: string;
  private readonly _cpf: string;
  private _email: Email;
  riskProfile: RiskProfile;

  constructor(name: string, cpf: string, email: Email, riskProfile: RiskProfile) {
    this.name = name;
    this._cpf = cpf;
    this._email = email;
    this.riskProfile = riskProfile;
  }

  setEmail(newEmail: Email): void {
    this._email = newEmail;
  }

  get email(): string {
    return this._email.getValue();
  }

  get cpf(): string {
    return this._cpf;
  }

  introduce(): string {
    return `Olá, meu nome é ${this.name} e meu perfil de risco é ${this.riskProfile}.`;
  }

  personalInfo(): string {
    return `
      Nome: ${this.name} 
      CPF: ${this._cpf}
      Email: ${this._email.getValue()} 
      Risco: ${this.riskProfile}
    `;
  }
}

export { Investor };
