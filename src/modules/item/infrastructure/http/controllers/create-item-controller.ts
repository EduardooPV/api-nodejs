import { IncomingMessage, ServerResponse } from 'http';
import { CreateItemUseCase } from 'modules/item/application/create-item/create-item-use-case';
import { BodyParser } from 'core/http/utils/parse-body';
import { ICreateItemRequestDTO } from 'modules/item/application/create-item/create-item-dto';
import { ReplyResponder } from 'core/http/utils/reply';
import { CreateItemViewModel } from 'modules/item/application/create-item/create-list-view-model';

class CreateItemController {
  constructor(private createItemUseCase: CreateItemUseCase) {}

  async handle(
    request: IncomingMessage & { userId?: string; params?: { shoppingListId?: string } },
    response: ServerResponse,
  ): Promise<void> {
    const rawBody = await BodyParser.parse(request);
    const shoppingListId = request.params?.shoppingListId;
    const userId = request.userId;

    const { name } = rawBody as ICreateItemRequestDTO;

    const item = await this.createItemUseCase.execute({
      name,
      shoppingListId,
      userId,
    });
    const itemHTTP = CreateItemViewModel.toHTTP(item);

    new ReplyResponder(response).created(itemHTTP);
  }
}

export { CreateItemController };
