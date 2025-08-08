import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { IAuthenticateUserRequestDTO } from './AuthenticateUserDTO';
import { PasswordIncorrectError } from '../../../../domains/auth/errors/PasswordIncorrect';
import { IUsersRepository } from '../../../../domains/users/repositories/IUserRepository';
import { IRefreshTokenResponseDTO } from '../refreshToken/RefreshTokenDTO';
import { EmailNotFound } from '../../../../domains/auth/errors/EmailNotFound';
import { env } from '../../../../shared/utils/env';

class AuthenticateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: IAuthenticateUserRequestDTO): Promise<IRefreshTokenResponseDTO> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) throw new EmailNotFound();

    const isPasswordMatch = await bcryptjs.compare(data.password, user.password);
    if (!isPasswordMatch) throw new PasswordIncorrectError();

    const accessToken = jsonwebtoken.sign({ sub: user.id }, env.secretJwt, {
      expiresIn: env.accessTokenExpiration,
    } as jsonwebtoken.SignOptions);

    const refreshToken = jsonwebtoken.sign({ sub: user.id }, env.refreshSecretJwt, {
      expiresIn: env.refreshTokenExpiration,
    } as jsonwebtoken.SignOptions);

    await this.userRepository.updateRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }
}

export { AuthenticateUserUseCase };
