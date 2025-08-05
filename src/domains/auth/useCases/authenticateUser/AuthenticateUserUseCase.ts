import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError';
import { IUsersRepository } from '../../../users/repositories/IUserRepository';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { IAuthenticateUserDTO } from './AuthenticateUserDTO';

class AuthenticateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: IAuthenticateUserDTO): Promise<string> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new InvalidCredentialsError(data.email);
    }

    const match = await bcryptjs.compare(data.password, user.password);

    if (!match) {
      throw new InvalidCredentialsError(data.email);
    }

    const token = jsonwebtoken.sign({ sub: user.id }, 'secret', {
      expiresIn: '1d',
    });

    return token;
  }
}

export { AuthenticateUserUseCase };
