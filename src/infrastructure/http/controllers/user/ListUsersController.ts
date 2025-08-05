import { IncomingMessage, ServerResponse } from 'http';
import { ListUsersUseCase } from '../../../../application/useCases/listUsers/ListUsersUseCase';
import { handleHttpError } from '../../../shared/http/handleHttpError';
import { getPaginationParams } from '../../../../shared/utils/paginationParams';
import { parseQueryParams } from '../../../shared/http/utils/parseQueryParams';
import { IListUsersRequestDTO } from '../../../../application/useCases/listUsers/ListUsersDTO';

class ListUsersController {
  constructor(private listUsersUseCase: ListUsersUseCase) {}

  async handle(request: IncomingMessage, response: ServerResponse): Promise<void> {
    try {
      const { page, perPage } = getPaginationParams(request);
      const { name, email, orderBy, orderDirection } = parseQueryParams(
        request,
      ) as IListUsersRequestDTO;

      const users = await this.listUsersUseCase.execute({
        page,
        perPage,
        name,
        email,
        orderBy,
        orderDirection,
      });

      response.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(users));
    } catch (error) {
      handleHttpError(error, response);
    }
  }
}

export { ListUsersController };
