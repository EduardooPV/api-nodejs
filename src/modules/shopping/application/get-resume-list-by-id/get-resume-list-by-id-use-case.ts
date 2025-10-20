import { InvalidUserIdError } from 'modules/users/domain/errors/invalid-user-id-error';
import { PostgresShoppingListRespository } from 'modules/shopping/infrastructure/database/postgres-shopping-list-repository';
import { ListNotFound } from 'modules/shopping/domain/errors/list-not-found';
import { NoPermission } from 'shared/errors/no-permission';
import { IGetResumeByIdDTO, IGetResumeByIdResponse } from './get-resume-list-by-id-dto';

class GetResumeByIdUseCase {
  constructor(private shoppingListRepository: PostgresShoppingListRespository) {}

  async execute(data: IGetResumeByIdDTO): Promise<IGetResumeByIdResponse> {
    if (data.userId == null) throw new InvalidUserIdError({ reason: 'missing' });

    const listExist = await this.shoppingListRepository.getListById(data.listId);

    if (listExist === null) throw new ListNotFound();

    if (listExist.userId !== data.userId) {
      throw new NoPermission();
    }

    const [doneItemsCount, pendingItemsCount, sumItemsCount] = await Promise.all([
      this.shoppingListRepository.getDoneItemsById(data.listId),
      this.shoppingListRepository.getPendingItemsById(data.listId),
      this.shoppingListRepository.getSumAmountItemsById(data.listId),
    ]);

    return {
      shoppingListId: data.listId,
      doneItemsCount,
      pendingItemsCount,
      sumItemsCount,
    };
  }
}

export { GetResumeByIdUseCase };
