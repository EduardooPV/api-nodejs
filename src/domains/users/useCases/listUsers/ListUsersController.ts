import { IncomingMessage, ServerResponse } from 'http';
import { ListUsersUseCase } from './ListUsersUseCase';
import { handleHttpError } from '../../../../shared/http/handleHttpError';
import { getPaginationParams } from '../../../../shared/utils/paginationParams';

class ListUsersController {
  constructor(private listUsersUseCase: ListUsersUseCase) {}

  async handle(request: IncomingMessage, response: ServerResponse): Promise<void> {
    try {
      const { page, perPage } = getPaginationParams(request);

      const users = await this.listUsersUseCase.execute({ page, perPage });

      response.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(users));
    } catch (error) {
      handleHttpError(error, response);
    }
  }
}

export { ListUsersController };
