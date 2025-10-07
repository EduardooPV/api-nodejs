import { IncomingMessage, ServerResponse } from 'http';
import { GetUserUseCase } from 'modules/users/application/getUser/GetUserUseCase';
import { reply } from 'core/http/utils/reply';
import { GetUserViewModel } from 'modules/users/application/getUser/GetUserViewModel';

class GetCurrentUserController {
  constructor(private getUserUseCase: GetUserUseCase) {}

  async handle(
    request: IncomingMessage & { userId?: string },
    response: ServerResponse,
  ): Promise<void> {
    const id = request.userId;

    const user = await this.getUserUseCase.execute({ id });
    const userHTTP = GetUserViewModel.toHTTP(user);

    reply(response).ok(userHTTP);
  }
}

export { GetCurrentUserController };
