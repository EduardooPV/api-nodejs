import { prisma } from '../database/prismaClient';
import { IUsersRepository } from '../../domains/users/repositories/IUserRepository';
import { User } from '../../domains/users/entities/User';
import { buildPaginationResponse } from '../../shared/utils/paginationResponse';
import { IPaginatedResponse } from '../../shared/interfaces/IPaginatedResponse';
import { IUpdateUserRequestDTO } from '../../domains/users/useCases/updateUser/UpdateUserDTO';

class PostgresUsersRepository implements IUsersRepository {
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

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email: email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id: id },
    });
  }

  async findAllPaginated(
    page: number = 1,
    perPage: number = 10,
    name?: string,
    email?: string,
    orderBy: string = 'name',
    orderDirection: 'asc' | 'desc' = 'asc',
  ): Promise<IPaginatedResponse<User>> {
    const skip = (page - 1) * perPage;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: perPage,
        where: {
          ...(name != null && { name: { contains: name } }),
          ...(email != null && { email: { contains: email } }),
        },
        orderBy: {
          [orderBy]: orderDirection,
        },
      }),
      prisma.user.count(),
    ]);

    return buildPaginationResponse(users, total, page, perPage);
  }

  async deleteById(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id: id },
    });
  }

  async updateById(id: string, data: IUpdateUserRequestDTO): Promise<void> {
    await prisma.user.update({
      where: { id: id },
      data,
    });
  }
}

export { PostgresUsersRepository };
