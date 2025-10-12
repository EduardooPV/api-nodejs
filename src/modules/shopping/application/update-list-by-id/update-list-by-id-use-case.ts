import { ShoppingList } from '../../domain/entities/shopping-list';
import { IShoppingList } from '../../domain/repositories/shopping-list-repository';
import { IUpdateListByIdDTO } from './update-list-by-id-dto';

class UpdateListByIdUseCase {
  constructor(private shoppingListRepository: IShoppingList) {}

  async execute(data: IUpdateListByIdDTO): Promise<ShoppingList> {
    const updatedList = await this.shoppingListRepository.updateListById(data);

    return updatedList;
  }
}

export { UpdateListByIdUseCase };
