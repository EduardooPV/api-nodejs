import { IncomingMessage, ServerResponse } from 'http';
import { CreateListUseCase } from 'modules/shopping/application/createList/CreateListUseCase';
import { parseBody } from 'core/http/utils/parseBody';
import { ICreateListRequestDTO } from 'modules/shopping/application/createList/CreateListDTO';
import { CreateListViewModel } from 'modules/shopping/application/createList/CreateListViewModel';
import { reply } from 'core/http/utils/reply';

class CreateListController {
  constructor(private createListUseCase: CreateListUseCase) {}

  async handle(
    request: IncomingMessage & { userId?: string },
    response: ServerResponse,
  ): Promise<void> {
    const rawBody = await parseBody(request);
    const userId = request.userId;

    const { name } = rawBody as ICreateListRequestDTO;

    const shoppingList = await this.createListUseCase.execute({
      name,
      userId,
    });
    const shoppingListHTTP = CreateListViewModel.toHTTP(shoppingList);

    reply(response).created(shoppingListHTTP);
  }
}

export { CreateListController };
