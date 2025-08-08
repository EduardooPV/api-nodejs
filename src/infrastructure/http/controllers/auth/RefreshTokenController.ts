import { IncomingMessage, ServerResponse } from 'http';
import { handleHttpError } from '../../utils/handleHttpError';
import { RefreshTokenUseCase } from '../../../../application/useCases/auth/refreshToken/RefreshTokenUseCase';
import { parseCookie } from '../../utils/parseCookie';
import { InvalidRefreshToken } from '../../../../domains/auth/errors/InvalidRefreshToken';

class RefreshTokenController {
  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

  async handle(request: IncomingMessage, response: ServerResponse): Promise<void> {
    try {
      const { refreshToken } = parseCookie(request.headers.cookie);

      if (!refreshToken) {
        throw new InvalidRefreshToken();
      }

      const tokens = await this.refreshTokenUseCase.execute(refreshToken);

      response
        .writeHead(200, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({ message: 'User authenticated successfully', ...tokens }));
    } catch (error) {
      handleHttpError(error, response);
    }
  }
}

export { RefreshTokenController };
