import { IncomingMessage, ServerResponse } from 'http';
import { LogoutUserUseCase } from '../../../../application/useCases/auth/logoutUser/LogoutUserUseCase';
import { parseCookie } from '../../utils/parseCookie';
import { NotFoundRefreshToken } from '../../../../domains/auth/errors/NotFoundRefreshToken';
import { handleHttpError } from '../../utils/handleHttpError';

class LogoutUserController {
  constructor(private logoutUseCase: LogoutUserUseCase) {}

  async handle(request: IncomingMessage, response: ServerResponse): Promise<void> {
    try {
      const { refreshToken } = parseCookie(request.headers.cookie);
      if (!refreshToken) throw new NotFoundRefreshToken();

      await this.logoutUseCase.execute(refreshToken);

      const isProd = process.env.NODE_ENV === 'production';
      response.setHeader(
        'Set-Cookie',
        [
          `refreshToken=`,
          'HttpOnly',
          'Path=/',
          'Max-Age=0',
          'SameSite=Strict',
          isProd ? 'Secure' : '',
        ]
          .filter(Boolean)
          .join('; '),
      );

      response
        .writeHead(200, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({ message: 'User logged out successfully' }));
    } catch (error) {
      handleHttpError(error, response);
    }
  }
}

export { LogoutUserController };
