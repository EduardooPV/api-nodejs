class Email {
  private readonly value: string;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new Error('Email inválido. Deve terminar com .com ou .com.br');
    }
    this.value = value;
  }

  private isValid(email: string): boolean {
    return /\S+@\S+\.(com(\.br)?)$/.test(email);
  }

  public getValue(): string {
    return this.value;
  }
}

export { Email };
