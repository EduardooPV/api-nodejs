import { User } from '../../entities/User';
import { UserAlreadyExistsError } from '../../errors/UserAlreadyExistsError';
import { IUsersRepository } from '../../repositories/IUserRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import bcryptjs from 'bcryptjs';

class CreateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: ICreateUserRequestDTO): Promise<void> {
    const userAlreadyExist = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExist) {
      throw new UserAlreadyExistsError(data.email);
    }

    const hashedPassword = await bcryptjs.hash(data.password, 8);

    const user = new User(data.name, data.email, hashedPassword);

    await this.userRepository.create(user);
  }
}

export { CreateUserUseCase };
