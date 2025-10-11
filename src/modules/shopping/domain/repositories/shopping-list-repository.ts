import { ICreateListRequestDTO } from 'modules/shopping/application/create-list/create-list-dto';
import { ShoppingList } from 'modules/shopping/domain/entities/shopping-list';
import { IGetListDTO } from 'modules/shopping/application/get-list/get-list-dto';

interface IShoppingList {
  create(data: ICreateListRequestDTO): Promise<ShoppingList>;
  getList(data: IGetListDTO): Promise<ShoppingList | null>;
}

export { IShoppingList };
