import { IncomingMessage, ServerResponse } from 'http';
import { LogoutUserUseCase } from 'modules/auth/application/logoutUser/LogoutUserUseCase';
import { parseCookie } from 'core/http/utils/parseCookie';
import { env } from 'shared/utils/env';
import { InvalidRefreshToken } from 'modules/auth/domain/errors/InvalidRefreshToken';
import { serializeCookie } from 'core/http/utils/cookies';
import { reply } from 'core/http/utils/reply';

class LogoutUserController {
  constructor(private logoutUseCase: LogoutUserUseCase) {}

  async handle(request: IncomingMessage, response: ServerResponse): Promise<void> {
    const { refreshToken } = parseCookie(request.headers.cookie);

    if (!refreshToken) throw new InvalidRefreshToken();

    await this.logoutUseCase.execute(refreshToken);

    const cookie = serializeCookie('refreshToken', '', {
      httpOnly: true,
      secure: env.nodeEnv === 'production',
      path: '/',
      sameSite: 'Strict',
      maxAge: 0,
    });

    response.setHeader('Set-Cookie', cookie);
    reply(response).noContent();
  }
}

export { LogoutUserController };
