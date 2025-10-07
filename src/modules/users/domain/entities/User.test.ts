import { User } from 'modules/users/domain/entities/User';

describe('User Entity', () => {
  it('should create a user with correct properties', () => {
    const user = new User('John Doe', 'john@example.com', 'hashed_password');

    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john@example.com');
    expect(user.password).toBe('hashed_password');
    expect(user.refreshToken).toBeUndefined();
  });

  it('should generate a unique id automatically', () => {
    const user1 = new User('A', 'a@example.com', '123');
    const user2 = new User('B', 'b@example.com', '456');

    expect(user1.id).toBeDefined();
    expect(user2.id).toBeDefined();
    expect(user1.id).not.toBe(user2.id);
  });

  it('should not allow id to be modified after creation', () => {
    const user = new User('Jane', 'jane@example.com', 'pass');
    expect(() => {
      // @ts-expect-error forçar alteração do readonly
      user.id = 'new-id';
    }).toThrow();
  });

  it('should accept a refreshToken if provided', () => {
    const user = new User('Mark', 'mark@example.com', 'pass', 'token123');
    expect(user.refreshToken).toBe('token123');
  });
});
