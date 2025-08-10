import { IncomingMessage, ServerResponse } from 'http';
import { CreateUserUseCase } from '../../../../application/useCases/users/createUser/CreateUserUseCase';
import { ICreateUserRequestDTO } from '../../../../application/useCases/users/createUser/CreateUserDTO';
import { parseBody } from '../../utils/parseBody';
import { reply } from '../../utils/reply';

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: IncomingMessage, response: ServerResponse): Promise<void> {
    const rawBody = await parseBody(request);

    const { name, email, password } = rawBody as ICreateUserRequestDTO;

    await this.createUserUseCase.execute({
      name,
      email,
      password,
    });

    reply(response).created(rawBody, '/users/:id');
  }
}

export { CreateUserController };
