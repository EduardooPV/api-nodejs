import { IncomingMessage, ServerResponse } from 'http';
import { LoginUserUseCase } from 'modules/auth/application/loginUser/LoginUserUseCase';
import { IAuthenticateUserRequestDTO } from 'modules/auth/application/loginUser/LoginUserDTO';
import { parseBody } from 'core/http/utils/parseBody';
import { env } from 'shared/utils/env';
import { serializeCookie } from 'core/http/utils/cookies';
import { reply } from 'core/http/utils/reply';

class LoginUserController {
  private readonly REFRESH_TOKEN_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

  constructor(private authenticateUserUseCase: LoginUserUseCase) {}

  async handle(request: IncomingMessage, response: ServerResponse): Promise<void> {
    const rawBody = await parseBody(request);

    const { email, password } = rawBody as IAuthenticateUserRequestDTO;

    const { accessToken, refreshToken } = await this.authenticateUserUseCase.execute({
      email,
      password,
    });

    const cookie = serializeCookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: env.nodeEnv === 'production',
      path: '/',
      sameSite: 'Strict',
      maxAge: this.REFRESH_TOKEN_MAX_AGE_SECONDS,
    });

    response.setHeader('Set-Cookie', cookie);
    reply(response).ok({ message: 'User authenticated successfully', accessToken });
  }
}

export { LoginUserController };
