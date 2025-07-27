import { IncomingMessage, ServerResponse } from 'http';
import { handleHttpError } from '../../../../shared/http/handleHttpError';
import { FindUserByIdUseCase } from './FindUserByIdUseCase';

class FindUserByIdController {
  constructor(private findUserByIdUseCase: FindUserByIdUseCase) {}

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

      const user = await this.findUserByIdUseCase.execute({ id });

      response.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(user));
    } catch (error) {
      handleHttpError(error, response);
    }
  }
}

export { FindUserByIdController };
