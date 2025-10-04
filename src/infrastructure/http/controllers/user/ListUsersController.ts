import { IncomingMessage, ServerResponse } from 'http';
import { ListUsersUseCase } from '@application/useCases/users/listUsers/ListUsersUseCase';
import { getPaginationParams } from '@shared/utils/paginationParams';
import { IListUsersRequestDTO } from '@application/useCases/users/listUsers/ListUsersDTO';
import { parseQueryParams } from '@infrastructure/http/utils/parseQueryParams';
import { reply } from '@infrastructure/http/utils/reply';

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
