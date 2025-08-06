import { IncomingMessage, ServerResponse } from 'http';
import { AuthenticateUserUseCase } from '../../../../application/useCases/authenticateUser/AuthenticateUserUseCase';
import { IAuthenticateUserRequestDTO } from '../../../../application/useCases/authenticateUser/AuthenticateUserDTO';
import { parseBody } from '../../utils/parseBody';
import { handleHttpError } from '../../utils/handleHttpError';

class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  async handle(request: IncomingMessage, response: ServerResponse): Promise<void> {
    try {
      const rawBody = await parseBody(request);

      const { email, password } = rawBody as IAuthenticateUserRequestDTO;

      const token = await this.authenticateUserUseCase.execute({ email, password });

      response
        .writeHead(200, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({ message: 'User authenticated successfully', token }));
    } catch (error) {
      handleHttpError(error, response);
    }
  }
}

export { AuthenticateUserController };
