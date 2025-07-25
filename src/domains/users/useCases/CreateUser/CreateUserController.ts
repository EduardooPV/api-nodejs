import { IncomingMessage, ServerResponse } from 'http';
import { CreateUserUseCase } from './CreateUserUseCase';
import { parseBody } from '../../../../shared/utils/parseBody';
import { handleHttpError } from '../../../../shared/http/handleHttpError';
import { ICreateUserRequestDTO } from './CreateUserDTO';

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: IncomingMessage, response: ServerResponse): Promise<void> {
    const rawBody = await parseBody(request);

    const { name, email, password } = rawBody as ICreateUserRequestDTO;

    try {
      await this.createUserUseCase.execute({
        name,
        email,
        password,
      });

      response
        .writeHead(201, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({ message: 'User created successfully' }));
    } catch (error) {
      handleHttpError(error, response);
    }
  }
}

export { CreateUserController };
