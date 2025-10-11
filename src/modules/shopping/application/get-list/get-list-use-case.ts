import { PostgresShoppingListRespository } from 'modules/shopping/infrastructure/database/postgres-shopping-list-repository';
import { ShoppingList } from 'modules/shopping/domain/entities/shopping-list';
import { IGetListDTO } from './get-list-dto';
import { ListNotFound } from 'modules/shopping/domain/errors/list-not-found';

class GetListUseCase {
  constructor(private shoppingListRepository: PostgresShoppingListRespository) {}

  async execute(data: IGetListDTO): Promise<ShoppingList> {
    const shoppingList = await this.shoppingListRepository.getList(data);

    if (shoppingList === null) throw new ListNotFound();

    return shoppingList;
  }
}

export { GetListUseCase };
