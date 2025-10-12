import { PostgresShoppingListRespository } from 'modules/shopping/infrastructure/database/postgres-shopping-list-repository';
import { ShoppingList } from 'modules/shopping/domain/entities/shopping-list';
import { IGetAllListsRequestDTO } from './get-all-lists-dto';
import { IPaginatedResponse } from 'shared/interfaces/paginated-response';

class GetAllListsUseCase {
  constructor(private shoppingListRepository: PostgresShoppingListRespository) {}

  async execute(data: IGetAllListsRequestDTO): Promise<IPaginatedResponse<ShoppingList>> {
    return await this.shoppingListRepository.getAllLists(data);
  }
}

export { GetAllListsUseCase };
