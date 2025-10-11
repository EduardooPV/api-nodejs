import { IncomingMessage, ServerResponse } from 'http';
import { GetAllListsUseCase } from 'modules/shopping/application/get-all-lists/get-all-lists-use-case';
import { ReplyResponder } from 'core/http/utils/reply';
import { GetAllListsViewModel } from 'modules/shopping/application/get-all-lists/get-all-lists-view-model';

class GetAllListsController {
  constructor(private getAllListsUseCase: GetAllListsUseCase) {}

  async handle(
    request: IncomingMessage & { userId?: string },
    response: ServerResponse,
  ): Promise<void> {
    const userId = request.userId;

    const shoppingList = await this.getAllListsUseCase.execute({
      userId,
    });

    const shoppingListsHTTP = shoppingList.map(GetAllListsViewModel.toHTTP);

    return new ReplyResponder(response).ok(shoppingListsHTTP);
  }
}

export { GetAllListsController };
