import { InvalidRefreshToken } from '../../../../domains/auth/errors/InvalidRefreshToken';
import { UserNotFound } from '../../../../domains/users/errors/UserNotFound';
import { IUsersRepository } from '../../../../domains/users/repositories/IUserRepository';
import jsonwebtoken from 'jsonwebtoken';
import { env } from '../../../../shared/utils/env';

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
