class UserName {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('User name cannot be empty.');
    }

    if (value.trim().length < 2) {
      throw new Error('User name must have at least 2 characters.');
    }

    if (value.trim().length > 50) {
      throw new Error('User name must not exceed 50 characters.');
    }

    this.value = value.trim();
    Object.freeze(this);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: UserName): boolean {
    return this.value === other.value;
  }
}

export { UserName };
