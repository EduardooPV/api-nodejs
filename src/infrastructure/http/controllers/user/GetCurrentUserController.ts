import { IncomingMessage, ServerResponse } from 'http';
import { GetUserUseCase } from '@application/useCases/users/getUser/GetUserUseCase';
import { reply } from '@infrastructure/http/utils/reply';
import { GetUserViewModel } from '@application/useCases/users/getUser/GetUserViewModel';

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
