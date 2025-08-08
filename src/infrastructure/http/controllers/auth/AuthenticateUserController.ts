import { IncomingMessage, ServerResponse } from 'http';
import { AuthenticateUserUseCase } from '../../../../application/useCases/auth/authenticateUser/AuthenticateUserUseCase';
import { IAuthenticateUserRequestDTO } from '../../../../application/useCases/auth/authenticateUser/AuthenticateUserDTO';
import { parseBody } from '../../utils/parseBody';
import { handleHttpError } from '../../utils/handleHttpError';

class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  async handle(request: IncomingMessage, response: ServerResponse): Promise<void> {
    try {
      const rawBody = await parseBody(request);

      const { email, password } = rawBody as IAuthenticateUserRequestDTO;

      const { accessToken, refreshToken } = await this.authenticateUserUseCase.execute({
        email,
        password,
      });

      const isProd = process.env.NODE_ENV === 'production';

      const cookie = [
        `refreshToken=${refreshToken}`,
        `HttpOnly`,
        `Path=/`,
        `Max-Age=${604800}`,
        `SameSite=Strict`,
        isProd ? 'Secure' : '',
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

export { AuthenticateUserController };
