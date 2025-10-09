import { IncomingMessage, ServerResponse } from 'http';
import { ListUsersUseCase } from 'modules/users/application/list-users/list-users-use-case';
import { getPaginationParams } from 'shared/utils/pagination-params';
import { IListUsersRequestDTO } from 'modules/users/application/list-users/list-users-dto';
import { QueryParser } from 'core/http/utils/parse-query-params';
import { reply } from 'core/http/utils/reply';

class ListUsersController {
  constructor(private listUsersUseCase: ListUsersUseCase) {}

  async handle(request: IncomingMessage, response: ServerResponse): Promise<void> {
    const { page, perPage } = getPaginationParams(request);
    const { name, email, orderBy, orderDirection } = QueryParser.parse(
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
