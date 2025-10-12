import { ShoppingList } from 'modules/shopping/domain/entities/shopping-list';
import { InvalidListName } from 'modules/shopping/domain/errors/invalid-list-name';
import { ListNotFound } from 'modules/shopping/domain/errors/list-not-found';
import { IShoppingList } from 'modules/shopping/domain/repositories/shopping-list-repository';
import { IUpdateListByIdDTO } from './update-list-by-id-dto';

class UpdateListByIdUseCase {
  constructor(private shoppingListRepository: IShoppingList) {}

  async execute(data: IUpdateListByIdDTO): Promise<ShoppingList> {
    const listExist = await this.shoppingListRepository.getListById(data.listId);

    if (listExist === null) throw new ListNotFound();

    if (!data.name || data.name.trim().length === 0) {
      throw new InvalidListName({ reason: 'missing' });
    }

    const updatedList = await this.shoppingListRepository.updateListById(data);

    return updatedList;
  }
}

export { UpdateListByIdUseCase };
