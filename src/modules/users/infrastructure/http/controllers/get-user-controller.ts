import { IncomingMessage, ServerResponse } from 'http';
import { GetUserUseCase } from 'modules/users/application/get-user/get-user-use-case';
import { ReplyResponder } from 'core/http/utils/reply';

class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {}

  async handle(
    request: IncomingMessage & { params?: { id: string } },
    response: ServerResponse,
  ): Promise<void> {
    const id = request.params?.id;

    const user = await this.getUserUseCase.execute({ id });

    new ReplyResponder(response).ok({ ...user });
  }
}

export { GetUserController };
