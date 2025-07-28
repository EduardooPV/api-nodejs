import { IncomingMessage, ServerResponse } from 'http';
import { handleHttpError } from '../../../../shared/http/handleHttpError';
import { GetUserUseCase } from './GetUserUseCase';

class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {}

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

      const user = await this.getUserUseCase.execute({ id });

      response.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(user));
    } catch (error) {
      handleHttpError(error, response);
    }
  }
}

export { GetUserController };
