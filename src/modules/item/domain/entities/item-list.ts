import crypto from 'crypto';

class ItemList {
  public readonly id: string;
  public readonly name: string;
  public readonly status: string;
  public readonly quantity: number;
  public readonly amount: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(
    name: string,
    status: string,
    quantity: number,
    amount: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.status = status;
    this.quantity = quantity;
    this.amount = amount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export { ItemList };
