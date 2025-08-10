import { IncomingMessage, ServerResponse } from 'http';
import { RefreshTokenUseCase } from '../../../../application/useCases/auth/refreshToken/RefreshTokenUseCase';
import { parseCookie } from '../../utils/parseCookie';
import { InvalidRefreshToken } from '../../../../domains/auth/errors/InvalidRefreshToken';
import { serializeCookie } from '../../utils/cookies';
import { env } from '../../../../shared/utils/env';
import { reply } from '../../utils/reply';

class RefreshTokenController {
  private readonly REFRESH_TOKEN_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

  async handle(request: IncomingMessage, response: ServerResponse): Promise<void> {
    const { refreshToken } = parseCookie(request.headers.cookie);

    if (!refreshToken) {
      throw new InvalidRefreshToken();
    }

    const { accessToken, refreshToken: newRefresh } =
      await this.refreshTokenUseCase.execute(refreshToken);

    const cookie = serializeCookie('refreshToken', newRefresh, {
      httpOnly: true,
      secure: env.nodeEnv === 'production',
      path: '/',
      sameSite: 'Strict',
      maxAge: this.REFRESH_TOKEN_MAX_AGE_SECONDS,
    });

    response.setHeader('Set-Cookie', cookie);
    reply(response).ok({ message: 'Token refreshed successfully', accessToken });
  }
}

export { RefreshTokenController };
