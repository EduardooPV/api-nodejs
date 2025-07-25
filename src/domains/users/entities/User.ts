class User {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;

  constructor(name: string, email: string, password: string, id?: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = id ?? crypto.randomUUID();
  }
}

export { User };
