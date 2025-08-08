import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { IAuthenticateUserRequestDTO } from './AuthenticateUserDTO';
import { InvalidCredentialsError } from '../../../../domains/auth/errors/InvalidCredentialsError';
import { IUsersRepository } from '../../../../domains/users/repositories/IUserRepository';
import { IRefreshTokenResponseDTO } from '../refreshToken/RefreshTokenDTO';

class AuthenticateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: IAuthenticateUserRequestDTO): Promise<IRefreshTokenResponseDTO> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) throw new InvalidCredentialsError(data.email);

    const match = await bcryptjs.compare(data.password, user.password);
    if (!match) throw new InvalidCredentialsError(data.email);

    const accessToken = jsonwebtoken.sign({ sub: user.id }, process.env.SECRET_JWT!, {
      expiresIn: '15m',
    });

    const refreshToken = jsonwebtoken.sign({ sub: user.id }, process.env.REFRESH_SECRET_JWT!, {
      expiresIn: '7d',
    });

    await this.userRepository.updateRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }
}

export { AuthenticateUserUseCase };
