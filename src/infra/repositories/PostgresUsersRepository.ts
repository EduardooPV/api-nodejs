import { prisma } from '../database/prismaClient';
import { IUsersRepository } from '../../domains/users/repositories/IUserRepository';
import { User } from '../../domains/users/entities/User';
import { buildPaginationResponse } from '../../shared/utils/paginationResponse';
import { IPaginatedResponse } from '../../shared/interfaces/IPaginatedResponse';

class PostgresUsersRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (user === null) {
      return null;
    }

    return user;
  }

  async create(user: User): Promise<void> {
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        id: crypto.randomUUID(),
      },
    });
  }

  async listUsers(page: number = 1, perPage: number = 10): Promise<IPaginatedResponse<User>> {
    const skip = (page - 1) * perPage;

    const [users, total] = await Promise.all([
      prisma.user.findMany({ skip, take: perPage }),
      prisma.user.count(),
    ]);

    return buildPaginationResponse(users, total, page, perPage);
  }

  async findUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id: id },
    });
  }
}

export { PostgresUsersRepository };
