import { IncomingMessage, ServerResponse } from 'http';

import { DeleteUserUseCase } from '../../../../application/useCases/deleteUser/DeleteUserUseCase';
import { handleHttpError } from '../../utils/handleHttpError';

class DeleteUserController {
  constructor(private deleteUserByIdUseCase: DeleteUserUseCase) {}

  async handle(
    request: IncomingMessage & { params?: { id: string } },
    response: ServerResponse,
  ): Promise<void> {
    try {
      const id = request.params?.id;

      await this.deleteUserByIdUseCase.execute({ id });

      response
        .writeHead(200, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({ message: 'User deleted successfully' }));
    } catch (error) {
      handleHttpError(error, response);
    }
  }
}

export { DeleteUserController };
