import { RiskProfile } from '../value-objects/RiskProfile';

class Investor {
  private readonly name: string;
  private readonly cpf: string;
  private readonly email: string;
  private readonly riskProfile: RiskProfile;

  constructor(name: string, cpf: string, email: string, riskProfile: RiskProfile) {
    this.name = name;
    this.cpf = cpf;
    this.email = email;
    this.riskProfile = riskProfile;
  }

  introduce(): string {
    return `Olá, meu nome é ${this.name} e meu perfil de risco é ${this.riskProfile}.`;
  }

  personalInfo(): string {
    return `
      Nome: ${this.name} 
      CPF: ${this.cpf}
      Email: ${this.email} 
      Risco: ${this.riskProfile}
    `;
  }
}

export { Investor };
