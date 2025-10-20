import { ItemList } from 'modules/item/domain/entities/item-list';
import { InvalidShoppingListId } from 'modules/item/domain/errors/invalid-shopping-list-id';
import { PostgresItemListRepository } from 'modules/item/infrastructure/database/postgres-item-list-repository';
import { IGetAllItemsByShoppingIdDTO } from './get-all-items-by-shopping-id-dto';
import { PostgresShoppingListRespository } from 'modules/shopping/infrastructure/database/postgres-shopping-list-repository';
import { ListNotFound } from 'modules/shopping/domain/errors/list-not-found';
import { NoPermission } from 'modules/../shared/errors/no-permission';

class GetAllItemsByShoppingIdUseCase {
  constructor(
    private itemListRepository: PostgresItemListRepository,
    private shoppingListRepository: PostgresShoppingListRespository,
  ) {}

  async execute(data: IGetAllItemsByShoppingIdDTO): Promise<ItemList[]> {
    if (data.shoppingListId == null) throw new InvalidShoppingListId();

    const shoppingListExist = await this.shoppingListRepository.getListById(data.shoppingListId);

    if (!shoppingListExist) {
      throw new ListNotFound();
    }

    if (shoppingListExist.userId !== data.userId) {
      throw new NoPermission();
    }

    return await this.itemListRepository.getAllItemsByShoppingId({
      shoppingListId: data.shoppingListId,
    });
  }
}

export { GetAllItemsByShoppingIdUseCase };
