import { InvalidRefreshToken } from 'modules/auth/domain/errors/InvalidRefreshToken';

import jsonwebtoken from 'jsonwebtoken';
import { IRefreshTokenResponseDTO } from './RefreshTokenDTO';
import { env } from 'shared/utils/env';
import { IUsersRepository } from 'modules/users/domain/repositories/IUserRepository';
import { UserNotFound } from 'modules/users/domain/errors/UserNotFound';

class RefreshTokenUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(refreshToken: string): Promise<IRefreshTokenResponseDTO> {
    let payload: { sub: string };

    try {
      payload = jsonwebtoken.verify(refreshToken, env.refreshSecretJwt) as {
        sub: string;
      };
    } catch {
      throw new InvalidRefreshToken();
    }

    const user = await this.userRepository.findById(payload.sub);
    if (!user) throw new UserNotFound();
    if (user.refreshToken !== refreshToken) throw new InvalidRefreshToken();

    const accessToken = jsonwebtoken.sign({ sub: user.id }, env.secretJwt, {
      expiresIn: env.accessTokenExpiration,
    } as jsonwebtoken.SignOptions);

    const newRefreshToken = jsonwebtoken.sign({ sub: user.id }, env.refreshSecretJwt, {
      expiresIn: env.refreshTokenExpiration,
    } as jsonwebtoken.SignOptions);

    await this.userRepository.updateRefreshToken(user.id, newRefreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  }
}

export { RefreshTokenUseCase };
