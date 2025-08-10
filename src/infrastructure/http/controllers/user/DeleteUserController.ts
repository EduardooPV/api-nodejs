import { IncomingMessage, ServerResponse } from 'http';
import { DeleteUserUseCase } from '../../../../application/useCases/users/deleteUser/DeleteUserUseCase';
import { reply } from '../../utils/reply';

class DeleteUserController {
  constructor(private deleteUserByIdUseCase: DeleteUserUseCase) {}

  async handle(
    request: IncomingMessage & { params?: { id: string } },
    response: ServerResponse,
  ): Promise<void> {
    const id = request.params?.id;

    await this.deleteUserByIdUseCase.execute({ id });

    reply(response).noContent();
  }
}

export { DeleteUserController };
