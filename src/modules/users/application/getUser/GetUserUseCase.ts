import { User } from 'modules/users/domain/entities/User';
import { InvalidUserIdError } from 'modules/users/domain/errors/InvalidUserIdError';
import { UserNotFound } from 'modules/users/domain/errors/UserNotFound';
import { IUsersRepository } from 'modules/users/domain/repositories/IUserRepository';
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
