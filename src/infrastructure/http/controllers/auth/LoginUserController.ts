import { IncomingMessage, ServerResponse } from 'http';
import { AuthenticateUserUseCase } from '../../../../application/useCases/auth/authenticateUser/AuthenticateUserUseCase';
import { IAuthenticateUserRequestDTO } from '../../../../application/useCases/auth/authenticateUser/AuthenticateUserDTO';
import { parseBody } from '../../utils/parseBody';
import { handleHttpError } from '../../utils/handleHttpError';
import { env } from '../../../../shared/utils/env';

class LoginUserController {
  private readonly REFRESH_TOKEN_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  async handle(request: IncomingMessage, response: ServerResponse): Promise<void> {
    try {
      const rawBody = await parseBody(request);

      const { email, password } = rawBody as IAuthenticateUserRequestDTO;

      const { accessToken, refreshToken } = await this.authenticateUserUseCase.execute({
        email,
        password,
      });

      const cookie = [
        `refreshToken=${refreshToken}`,
        `HttpOnly`,
        `Path=/`,
        `Max-Age=${this.REFRESH_TOKEN_MAX_AGE_SECONDS}`,
        `SameSite=Strict`,
        env.nodeEnv === 'production' ? 'Secure' : '',
      ]
        .filter(Boolean)
        .join('; ');

      response.setHeader('Set-Cookie', cookie);
      response
        .writeHead(200, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({ message: 'User authenticated successfully', accessToken }));
    } catch (error) {
      handleHttpError(error, response);
    }
  }
}

export { LoginUserController };
