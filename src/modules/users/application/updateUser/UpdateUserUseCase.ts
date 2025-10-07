import { InvalidUserIdError } from 'modules/users/domain/errors/InvalidUserIdError';
import { UserNotFound } from 'modules/users/domain/errors/UserNotFound';
import { IUsersRepository } from 'modules/users/domain/repositories/IUserRepository';
import { IUpdateUserRequestDTO } from './UpdateUserDTO';
import { User } from 'modules/users/domain/entities/User';

class UpdateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: IUpdateUserRequestDTO): Promise<User> {
    if (data.id == null) throw new InvalidUserIdError({ reason: 'missing' });

    const userExist = await this.userRepository.findById(data.id);

    if (!userExist) throw new UserNotFound();

    const newUser = await this.userRepository.updateById(data);

    if (!newUser) throw new UserNotFound();

    return newUser;
  }
}

export { UpdateUserUseCase };
