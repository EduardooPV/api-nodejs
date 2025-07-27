import { IPaginatedResponse } from '../../../shared/interfaces/IPaginatedResponse';
import { User } from '../entities/User';

interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<void>;
  listUsers(page: number, perPage: number): Promise<IPaginatedResponse<User>>;
  findById(id: string): Promise<User | null>;
  deleteById(id: string): Promise<void>;
}

export { IUsersRepository };
