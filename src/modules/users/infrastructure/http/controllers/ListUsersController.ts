import { IncomingMessage, ServerResponse } from 'http';
import { ListUsersUseCase } from 'modules/users/application/listUsers/ListUsersUseCase';
import { getPaginationParams } from 'shared/utils/paginationParams';
import { IListUsersRequestDTO } from 'modules/users/application/listUsers/ListUsersDTO';
import { parseQueryParams } from 'core/http/utils/parseQueryParams';
import { reply } from 'core/http/utils/reply';

class ListUsersController {
  constructor(private listUsersUseCase: ListUsersUseCase) {}

  async handle(request: IncomingMessage, response: ServerResponse): Promise<void> {
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

    reply(response).ok({ ...users });
  }
}

export { ListUsersController };
