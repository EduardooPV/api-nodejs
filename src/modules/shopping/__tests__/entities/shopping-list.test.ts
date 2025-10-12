// @ts-nocheck
import crypto from 'crypto';
import { ShoppingList } from 'modules/shopping/domain/entities/shopping-list';

describe('ShoppingList Entity', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a ShoppingList instance with valid properties', () => {
    const mockUUID = 'uuid-123';
    jest.spyOn(crypto, 'randomUUID').mockReturnValue(mockUUID);

    const now = new Date();
    const shoppingList = new ShoppingList('user-123', 'Groceries', now, now);

    expect(shoppingList.id).toBe(mockUUID);
    expect(shoppingList.userId).toBe('user-123');
    expect(shoppingList.name).toBe('Groceries');
    expect(shoppingList.createdAt).toBe(now);
    expect(shoppingList.updatedAt).toBe(now);
  });

  it('should generate a unique id for each ShoppingList', () => {
    const uuidSpy = jest.spyOn(crypto, 'randomUUID');
    new ShoppingList('user-1', 'List 1', new Date(), new Date());
    new ShoppingList('user-2', 'List 2', new Date(), new Date());
    expect(uuidSpy).toHaveBeenCalledTimes(2);
  });
});
