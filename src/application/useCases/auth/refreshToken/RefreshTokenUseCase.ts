import { InvalidRefreshToken } from '../../../../domains/auth/errors/InvalidRefreshToken';
import { UserNotFound } from '../../../../domains/users/errors/UserNotFound';
import { IUsersRepository } from '../../../../domains/users/repositories/IUserRepository';
import jsonwebtoken from 'jsonwebtoken';

class RefreshTokenUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    let payload: { sub: string };

    try {
      payload = jsonwebtoken.verify(refreshToken, process.env.REFRESH_SECRET_JWT!) as {
        sub: string;
      };
    } catch {
      throw new InvalidRefreshToken();
    }

    const user = await this.userRepository.findById(payload.sub);
    if (!user) {
      throw new UserNotFound();
    }
    if (user.refreshToken !== refreshToken) {
      throw new InvalidRefreshToken();
    }

    const accessToken = jsonwebtoken.sign({ sub: user.id }, process.env.SECRET_JWT!, {
      expiresIn: '15m',
    });

    const newRefreshToken = jsonwebtoken.sign({ sub: user.id }, process.env.REFRESH_SECRET_JWT!, {
      expiresIn: '7d',
    });

    await this.userRepository.updateRefreshToken(user.id, newRefreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  }
}

export { RefreshTokenUseCase };
