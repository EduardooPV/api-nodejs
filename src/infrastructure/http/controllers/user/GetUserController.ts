import { IncomingMessage, ServerResponse } from 'http';
import { GetUserUseCase } from '../../../../application/useCases/users/getUser/GetUserUseCase';
import { reply } from '../../utils/reply';

class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {}

  async handle(
    request: IncomingMessage & { params?: { id: string } },
    response: ServerResponse,
  ): Promise<void> {
    const id = request.params?.id;

    const user = await this.getUserUseCase.execute({ id });

    reply(response).ok({ ...user });
  }
}

export { GetUserController };
