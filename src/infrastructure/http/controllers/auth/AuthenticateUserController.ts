import { IncomingMessage, ServerResponse } from 'http';
import { handleHttpError } from '../../../shared/http/handleHttpError';
import { AuthenticateUserUseCase } from '../../../../application/useCases/authenticateUser/AuthenticateUserUseCase';
import { parseBody } from '../../../shared/http/utils/parseBody';
import { IAuthenticateUserRequestDTO } from '../../../../application/useCases/authenticateUser/AuthenticateUserDTO';

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
