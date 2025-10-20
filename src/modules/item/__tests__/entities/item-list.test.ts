// @ts-nocheck
import crypto from 'crypto';
import { ItemList } from 'modules/item/domain/entities/item-list';

describe('ItemList Entity', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create an ItemList instance with valid properties', () => {
    const mockUUID = 'uuid-123';
    jest.spyOn(crypto, 'randomUUID').mockReturnValue(mockUUID);

    const now = new Date();
    const item = new ItemList('Bananas', 'PENDING', 3, 12.5, now, now);

    expect(item.id).toBe(mockUUID);
    expect(item.name).toBe('Bananas');
    expect(item.status).toBe('PENDING');
    expect(item.quantity).toBe(3);
    expect(item.amount).toBe(12.5);
    expect(item.createdAt).toBe(now);
    expect(item.updatedAt).toBe(now);
  });

  it('should generate a unique id for each ItemList instance', () => {
    const uuidSpy = jest.spyOn(crypto, 'randomUUID');
    new ItemList('Apples', 'DONE', 2, 8.0, new Date(), new Date());
    new ItemList('Oranges', 'PENDING', 5, 15.0, new Date(), new Date());
    expect(uuidSpy).toHaveBeenCalledTimes(2);
  });
});
