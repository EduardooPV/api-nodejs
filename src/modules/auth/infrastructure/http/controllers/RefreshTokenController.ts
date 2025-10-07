import { IncomingMessage, ServerResponse } from 'http';
import { RefreshTokenUseCase } from 'modules/auth/application/refreshToken/RefreshTokenUseCase';
import { parseCookie } from 'core/http/utils/parseCookie';
import { InvalidRefreshToken } from 'modules/auth/domain/errors/InvalidRefreshToken';
import { serializeCookie } from 'core/http/utils/cookies';
import { env } from 'shared/utils/env';
import { reply } from 'core/http/utils/reply';

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
