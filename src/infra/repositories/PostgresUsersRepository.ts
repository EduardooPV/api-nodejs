import { prisma } from '../database/prismaClient';
import { IUsersRepository } from '../../domains/users/repositories/IUserRepository';
import { User } from '../../domains/users/entities/User';

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
}

export { PostgresUsersRepository };
