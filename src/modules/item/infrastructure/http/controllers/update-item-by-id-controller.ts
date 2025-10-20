import { IncomingMessage, ServerResponse } from 'http';
import { BodyParser } from 'core/http/utils/parse-body';
import { ReplyResponder } from 'core/http/utils/reply';
import { IUpdateItemByIdRequestDTO } from 'modules/item/application/update-item-by-id/update-item-by-id-dto';
import { UpdateItemByIdUseCase } from 'modules/item/application/update-item-by-id/update-item-by-id-use-case';
import { UpdateItemByIdViewModel } from 'modules/item/application/update-item-by-id/update-item-by-id-view-model';

class UpdateItemByIdController {
  constructor(private updateItemByIdUseCase: UpdateItemByIdUseCase) {}

  async handle(
    request: IncomingMessage & {
      userId?: string;
      params?: { shoppingListId?: string; itemId?: string };
    },
    response: ServerResponse,
  ): Promise<void> {
    const rawBody = await BodyParser.parse(request);
    const userId = request.userId;
    const itemId = request.params?.itemId;
    const shoppingListId = request.params?.shoppingListId;

    const body = rawBody as IUpdateItemByIdRequestDTO;

    const item = await this.updateItemByIdUseCase.execute({
      ...body,
      shoppingListId,
      userId,
      itemId,
    });
    const itemHTTP = UpdateItemByIdViewModel.toHTTP(item);

    new ReplyResponder(response).ok(itemHTTP);
  }
}

export { UpdateItemByIdController };
