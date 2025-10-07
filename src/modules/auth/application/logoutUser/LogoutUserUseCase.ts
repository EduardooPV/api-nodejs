import { InvalidRefreshToken } from 'modules/auth/domain/errors/InvalidRefreshToken';

import jsonwebtoken from 'jsonwebtoken';
import { env } from 'shared/utils/env';
import { IUsersRepository } from 'modules/users/domain/repositories/IUserRepository';
import { UserNotFound } from 'modules/users/domain/errors/UserNotFound';

class LogoutUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(refreshToken: string): Promise<void> {
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
    if (user.refreshToken == null) throw new InvalidRefreshToken();

    await this.userRepository.updateRefreshToken(user.id, null);
  }
}

export { LogoutUserUseCase };
