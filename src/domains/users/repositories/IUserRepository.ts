import { User } from '../entities/User';

interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<void>;
}

export { IUsersRepository };
