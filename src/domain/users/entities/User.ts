import crypto from 'crypto';

class User {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;
  public readonly refreshToken?: string | null;

  constructor(name: string, email: string, password: string, refreshToken?: string | null) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.refreshToken = refreshToken;
    this.id = crypto.randomUUID();
    Object.freeze(this);
  }
}

export { User };
