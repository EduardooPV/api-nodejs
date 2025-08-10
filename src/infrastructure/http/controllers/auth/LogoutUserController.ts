import { IncomingMessage, ServerResponse } from 'http';
import { LogoutUserUseCase } from '../../../../application/useCases/auth/logoutUser/LogoutUserUseCase';
import { parseCookie } from '../../utils/parseCookie';
import { env } from '../../../../shared/utils/env';
import { InvalidRefreshToken } from '../../../../domains/auth/errors/InvalidRefreshToken';
import { serializeCookie } from '../../utils/cookies';
import { reply } from '../../utils/reply';

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
