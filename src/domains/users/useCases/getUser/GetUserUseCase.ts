import { User } from '../../entities/User';
import { UserNotFound } from '../../errors/UserNotFound';
import { IUsersRepository } from '../../repositories/IUserRepository';
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
