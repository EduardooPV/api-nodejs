import { IPaginatedResponse } from 'shared/interfaces/paginated-response';
import { User } from 'modules/users/domain/entities/user';

interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(user: User): Promise<void>;
  deleteById(id: string): Promise<void>;
  updateById(data: Partial<User>): Promise<User | null>;
  findAllPaginated(
    page: number,
    perPage: number,
    name?: string,
    email?: string,
    orderBy?: string,
    orderDirection?: 'asc' | 'desc',
  ): Promise<IPaginatedResponse<User>>;
  updateRefreshToken(userId: string, refreshToken: string | null): Promise<void>;
}

export { IUsersRepository };
