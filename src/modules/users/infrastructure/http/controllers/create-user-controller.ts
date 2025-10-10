import { IncomingMessage, ServerResponse } from 'http';
import { CreateUserUseCase } from 'modules/users/application/create-user/create-user-use-case';
import { ICreateUserRequestDTO } from 'modules/users/application/create-user/create-user-dto';
import { BodyParser } from 'core/http/utils/parse-body';
import { ReplyResponder } from 'core/http/utils/reply';

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: IncomingMessage, response: ServerResponse): Promise<void> {
    const rawBody = await BodyParser.parse(request);

    const { name, email, password } = rawBody as ICreateUserRequestDTO;

    await this.createUserUseCase.execute({
      name,
      email,
      password,
    });

    new ReplyResponder(response).created(rawBody, '/users/:id');
  }
}

export { CreateUserController };
