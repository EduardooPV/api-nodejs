import { IncomingMessage, ServerResponse } from 'http';
import { handleHttpError } from '../../../../shared/http/handleHttpError';
import { DeleteUserUseCase } from './DeleteUserUseCase';

class DeleteUserController {
  constructor(private deleteUserByIdUseCase: DeleteUserUseCase) {}

  async handle(
    request: IncomingMessage & { params?: { id: string } },
    response: ServerResponse,
  ): Promise<void> {
    try {
      const id = request.params?.id;

      if (id == null) {
        response
          .writeHead(400, { 'Content-Type': 'application/json' })
          .end(JSON.stringify({ error: 'User id is required' }));
        return;
      }

      await this.deleteUserByIdUseCase.execute({ id });

      response.writeHead(204).end();
    } catch (error) {
      handleHttpError(error, response);
    }
  }
}

export { DeleteUserController };
