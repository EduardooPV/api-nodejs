import { IncomingMessage, ServerResponse } from 'http';
import { CreateUserUseCase } from 'modules/users/application/createUser/CreateUserUseCase';
import { ICreateUserRequestDTO } from 'modules/users/application/createUser/CreateUserDTO';
import { parseBody } from 'core/http/utils/parseBody';
import { reply } from 'core/http/utils/reply';

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
