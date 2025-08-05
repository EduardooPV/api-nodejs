import { User } from '../../../domains/users/entities/User';
import { UserNotFound } from '../../../domains/users/errors/UserNotFound';
import { IUsersRepository } from '../../../domains/users/repositories/IUserRepository';
import { IGetUserRequestDTO } from './GetUserDTO';

class GetUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: IGetUserRequestDTO): Promise<User | null> {
    if (data.id == null) {
      throw new Error('User id is required');
    }

    const user = await this.userRepository.findById(data.id);

    if (!user) {
      throw new UserNotFound();
    }

    return user;
  }
}
export { GetUserUseCase };
