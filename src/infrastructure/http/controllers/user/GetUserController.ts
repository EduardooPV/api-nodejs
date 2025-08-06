import { IncomingMessage, ServerResponse } from 'http';
import { GetUserUseCase } from '../../../../application/useCases/getUser/GetUserUseCase';
import { handleHttpError } from '../../utils/handleHttpError';

class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {}

  async handle(
    request: IncomingMessage & { params?: { id: string } },
    response: ServerResponse,
  ): Promise<void> {
    try {
      const id = request.params?.id;

      const user = await this.getUserUseCase.execute({ id });

      response.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(user));
    } catch (error) {
      handleHttpError(error, response);
    }
  }
}

export { GetUserController };
