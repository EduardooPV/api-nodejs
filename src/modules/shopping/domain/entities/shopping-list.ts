import crypto from 'crypto';

class ShoppingList {
  public readonly id: string;
  public readonly userId: string;
  public readonly name: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(userId: string, name: string, createdAt: Date, updatedAt: Date) {
    this.id = crypto.randomUUID();
    this.userId = userId;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export { ShoppingList };
