import { ICreateListRequestDTO } from 'modules/shopping/application/create-list/create-list-dto';
import { ShoppingList } from 'modules/shopping/domain/entities/shopping-list';
import { IGetAllListsRequestDTO } from 'modules/shopping/application/get-all-lists/get-all-lists-dto';
import { IDeleteListByIdDTO } from 'modules/shopping/application/delete-list-by-id/delete-list-by-id-dto';

interface IShoppingList {
  create(data: ICreateListRequestDTO): Promise<ShoppingList>;
  getAllLists(data: IGetAllListsRequestDTO): Promise<ShoppingList[]>;
  deleteListById(data: IDeleteListByIdDTO): Promise<void>;
  updateListById(data: Partial<ShoppingList>): Promise<ShoppingList>;
}

export { IShoppingList };
