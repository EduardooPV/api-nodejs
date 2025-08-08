import { IncomingMessage, ServerResponse } from 'http';
import { LogoutUserUseCase } from '../../../../application/useCases/auth/logoutUser/LogoutUserUseCase';
import { parseCookie } from '../../utils/parseCookie';
import { NotFoundRefreshToken } from '../../../../domains/auth/errors/NotFoundRefreshToken';
import { handleHttpError } from '../../utils/handleHttpError';
import { env } from '../../../../shared/utils/env';

class LogoutUserController {
  constructor(private logoutUseCase: LogoutUserUseCase) {}

  async handle(request: IncomingMessage, response: ServerResponse): Promise<void> {
    try {
      const { refreshToken } = parseCookie(request.headers.cookie);
      if (!refreshToken) throw new NotFoundRefreshToken();

      await this.logoutUseCase.execute(refreshToken);

      const cookie = [
        `refreshToken=`,
        `HttpOnly`,
        `Path=/`,
        `Max-Age=`,
        `SameSite=Strict`,
        env.nodeEnv === 'production' ? 'Secure' : '',
      ]
        .filter(Boolean)
        .join('; ');

      response.setHeader('Set-Cookie', cookie);
      response
        .writeHead(200, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({ message: 'User logged out successfully' }));
    } catch (error) {
      handleHttpError(error, response);
    }
  }
}

export { LogoutUserController };
