import { IncomingMessage, ServerResponse } from 'http';
import { GetListUseCase } from 'modules/shopping/application/get-list/get-list-use-case';
import { ReplyResponder } from 'core/http/utils/reply';
import { IGetListRequestDTO } from 'modules/shopping/application/get-list/get-list-dto';
import { GetListViewModel } from 'modules/shopping/application/get-list/get-list-view-model';

class GetListController {
  constructor(private getListUseCase: GetListUseCase) {}

  async handle(
    request: IncomingMessage & { userId?: string } & { params?: IGetListRequestDTO },
    response: ServerResponse,
  ): Promise<void> {
    const userId = request.userId;
    const listId = request.params?.listId;

    const shoppingList = await this.getListUseCase.execute({
      userId,
      listId,
    });
    const shoppingListHTTP = GetListViewModel.toHTTP(shoppingList);

    return new ReplyResponder(response).ok({ ...shoppingListHTTP });
  }
}

export { GetListController };
