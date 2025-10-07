import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { IAuthenticateUserRequestDTO } from './LoginUserDTO';
import { InvalidCredentials } from 'modules/auth/domain/errors/InvalidCredentials';
import { IRefreshTokenResponseDTO } from 'modules/auth/application/refreshToken/RefreshTokenDTO';
import { env } from 'shared/utils/env';
import { IUsersRepository } from 'modules/users/domain/repositories/IUserRepository';

class LoginUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: IAuthenticateUserRequestDTO): Promise<IRefreshTokenResponseDTO> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) throw new InvalidCredentials();

    const isPasswordMatch = await bcryptjs.compare(data.password, user.password);
    if (!isPasswordMatch) throw new InvalidCredentials();

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

export { LoginUserUseCase };
