import { ICreateListRequestDTO } from 'modules/shopping/application/createList/CreateListDTO';
import { ShoppingList } from '../entities/ShoppingList';

export interface ICreateListDTO {
  userId: string;
  name: string;
}

interface IShoppingList {
  create(data: ICreateListRequestDTO): Promise<ShoppingList>;
}

export { IShoppingList };
