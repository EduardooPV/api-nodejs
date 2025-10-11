import { PostgresShoppingListRespository } from 'modules/shopping/infrastructure/database/postgres-shopping-list-repository';
import { ShoppingList } from 'modules/shopping/domain/entities/shopping-list';
import { IGetAllListsRequestDTO } from './get-all-lists-dto';

class GetAllListsUseCase {
  constructor(private shoppingListRepository: PostgresShoppingListRespository) {}

  async execute(data: IGetAllListsRequestDTO): Promise<ShoppingList[]> {
    return await this.shoppingListRepository.getAllLists(data);
  }
}

export { GetAllListsUseCase };
