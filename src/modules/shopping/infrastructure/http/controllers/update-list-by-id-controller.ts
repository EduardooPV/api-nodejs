import { IncomingMessage, ServerResponse } from 'http';
import { UpdateListByIdUseCase } from '../../../application/update-list-by-id/update-list-by-id-use-case';
import { BodyParser } from '../../../../../core/http/utils/parse-body';
import { IUpdateListByIdRequestDTO } from '../../../application/update-list-by-id/update-list-by-id-dto';
import { ReplyResponder } from '../../../../../core/http/utils/reply';
import { UpdateListByIdViewModel } from '../../../application/update-list-by-id/update-list-by-id-view-model';

class UpdateListByIdController {
  constructor(private updateListByIdUseCase: UpdateListByIdUseCase) {}

  async handle(
    request: IncomingMessage & { userId?: string; params?: { id?: string } },
    response: ServerResponse,
  ): Promise<void> {
    const rawBody = await BodyParser.parse(request);
    const userId = request.userId;
    const listId = request.params?.id;

    const body = rawBody as IUpdateListByIdRequestDTO;

    const shoppingList = await this.updateListByIdUseCase.execute({ userId, listId, ...body });
    const shoppingListHTTP = UpdateListByIdViewModel.toHTTP(shoppingList);

    new ReplyResponder(response).ok(shoppingListHTTP);
  }
}

export { UpdateListByIdController };
