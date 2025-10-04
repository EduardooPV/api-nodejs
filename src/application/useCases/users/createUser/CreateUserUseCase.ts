import { User } from '@domain/users/entities/User';
import { UserAlreadyExistsError } from '@domain/users/errors/UserAlreadyExistsError';
import { IUsersRepository } from '@domain/users/repositories/IUserRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import bcryptjs from 'bcryptjs';

const BCRYPT_COST = 10;

class CreateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: ICreateUserRequestDTO): Promise<void> {
    const userAlreadyExist = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExist) throw new UserAlreadyExistsError(data.email);

    const passwordHash = await bcryptjs.hash(data.password, BCRYPT_COST);

    const user = new User(data.name, data.email, passwordHash);

    await this.userRepository.create(user);
  }
}

export { CreateUserUseCase };
