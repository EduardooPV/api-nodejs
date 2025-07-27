import { User } from '../../entities/User';
import { UserNotFound } from '../../errors/UserNotFound';
import { IUsersRepository } from '../../repositories/IUserRepository';
import { IFindUserByIdRequestDTO } from './FindUserByIdDTO';

class FindUserByIdUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: IFindUserByIdRequestDTO): Promise<User | null> {
    const user = await this.userRepository.findUserById(data.id);

    if (!user) {
      throw new UserNotFound();
    }

    return user;
  }
}
export { FindUserByIdUseCase };
