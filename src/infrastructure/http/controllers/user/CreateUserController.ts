import { IncomingMessage, ServerResponse } from 'http';
import { CreateUserUseCase } from '../../../../application/useCases/createUser/CreateUserUseCase';
import { ICreateUserRequestDTO } from '../../../../application/useCases/createUser/CreateUserDTO';
import { parseBody } from '../../utils/parseBody';
import { handleHttpError } from '../../utils/handleHttpError';

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: IncomingMessage, response: ServerResponse): Promise<void> {
    try {
      const rawBody = await parseBody(request);

      const { name, email, password } = rawBody as ICreateUserRequestDTO;

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
