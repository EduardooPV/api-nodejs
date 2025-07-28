import { User } from '../../entities/User';
import { UserAlreadyExistsError } from '../../errors/UserAlreadyExistsError';
import { IUsersRepository } from '../../repositories/IUserRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';

class CreateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: ICreateUserRequestDTO): Promise<void> {
    const userAlreadyExist = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExist) {
      throw new UserAlreadyExistsError(data.email);
    }

    const user = new User(data.name, data.email, data.password);

    await this.userRepository.create(user);
  }
}

export { CreateUserUseCase };
