import { ICreateListRequestDTO } from 'modules/shopping/application/create-list/create-list-dto';
import { ShoppingList } from 'modules/shopping/domain/entities/shopping-list';
import { IGetAllListsRequestDTO } from 'modules/shopping/application/get-all-lists/get-all-lists-dto';

interface IShoppingList {
  create(data: ICreateListRequestDTO): Promise<ShoppingList>;
  getAllLists(data: IGetAllListsRequestDTO): Promise<ShoppingList[]>;
}

export { IShoppingList };
