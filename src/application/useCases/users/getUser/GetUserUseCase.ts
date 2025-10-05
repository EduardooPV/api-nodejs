import { User } from '@domain/users/entities/User';
import { InvalidUserIdError } from '@domain/users/errors/InvalidUserIdError';
import { UserNotFound } from '@domain/users/errors/UserNotFound';
import { IUsersRepository } from '@domain/users/repositories/IUserRepository';
import { IGetUserRequestDTO } from './GetUserDTO';

class GetUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: IGetUserRequestDTO): Promise<User> {
    if (data.id == null) throw new InvalidUserIdError({ reason: 'missing' });

    const user = await this.userRepository.findById(data.id);

    if (!user) throw new UserNotFound();

    return user;
  }
}
export { GetUserUseCase };
