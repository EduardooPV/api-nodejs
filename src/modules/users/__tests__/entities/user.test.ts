// @ts-nocheck
import crypto from 'crypto';
import { User } from 'modules/users/domain/entities/user';

jest.mock('crypto');

describe('User Entity', () => {
  beforeEach(() => {
    (crypto.randomUUID as jest.Mock).mockReturnValue('mocked-uuid');
  });

  it('should create a user with all required properties', () => {
    const user = new User('John Doe', 'john@example.com', 'hashed_password');

    expect(user.id).toBe('mocked-uuid');
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john@example.com');
    expect(user.password).toBe('hashed_password');
    expect(user.refreshToken).toBeUndefined();
  });

  it('should create a user with a refresh token', () => {
    const user = new User('Jane Doe', 'jane@example.com', 'hashed_password', 'refresh123');

    expect(user.refreshToken).toBe('refresh123');
  });

  it('should create a user with a null refresh token', () => {
    const user = new User('Jake', 'jake@example.com', 'hashed_password', null);

    expect(user.refreshToken).toBeNull();
  });

  it('should make the user object immutable', () => {
    const user = new User('Anna', 'anna@example.com', 'hashed_password');

    expect(Object.isFrozen(user)).toBe(true);
  });
});
