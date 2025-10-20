import { ItemList } from 'modules/item/domain/entities/item-list';
import { InvalidItemName } from 'modules/item/domain/errors/invalid-item-name';
import { InvalidShoppingListId } from 'modules/item/domain/errors/invalid-shopping-list-id';
import { PostgresItemListRepository } from 'modules/item/infrastructure/database/postgres-item-list-repository';
import { ICreateItemRequestDTO } from './create-item-dto';
import { PostgresShoppingListRespository } from 'modules/shopping/infrastructure/database/postgres-shopping-list-repository';
import { ListNotFound } from 'modules/shopping/domain/errors/list-not-found';
import { NoPermission } from 'shared/errors/no-permission';

class CreateItemUseCase {
  constructor(
    private itemListRepository: PostgresItemListRepository,
    private shoppingListRepository: PostgresShoppingListRespository,
  ) {}

  async execute(data: ICreateItemRequestDTO): Promise<ItemList> {
    if (data.shoppingListId == null) throw new InvalidShoppingListId();

    if (!data.name || data.name.trim().length === 0) {
      throw new InvalidItemName({ reason: 'missing' });
    }

    const shoppingListExist = await this.shoppingListRepository.getListById(data.shoppingListId);

    if (!shoppingListExist) {
      throw new ListNotFound();
    }

    if (shoppingListExist.userId !== data.userId) {
      throw new NoPermission();
    }

    return await this.itemListRepository.create({
      name: data.name.trim(),
      shoppingListId: data.shoppingListId,
      userId: data.userId,
    });
  }
}

export { CreateItemUseCase };
