import { User } from '../../domains/users/entities/User';
import { IUsersRepository } from '../../domains/users/repositories/IUserRepository';

class PostgresUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
}

export { PostgresUsersRepository };
