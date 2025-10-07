import { IUpdateUserRequestDTO } from 'modules/users/application/updateUser/UpdateUserDTO';
import { User } from 'modules/users/domain/entities/User';
import { IUsersRepository } from 'modules/users/domain/repositories/IUserRepository';
import { IPaginatedResponse } from 'shared/interfaces/IPaginatedResponse';
import { buildPaginationResponse } from 'shared/utils/paginationResponse';
import { prisma } from 'core/database/prismaClient';
import crypto from 'crypto';

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

  async updateById(data: IUpdateUserRequestDTO): Promise<User | null> {
    return await prisma.user.update({
      where: { id: data.id },
      data,
    });
  }

  async updateRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: refreshToken },
    });
  }
}

export { PostgresUsersRepository };
