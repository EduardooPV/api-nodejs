import { ICreateListRequestDTO } from 'modules/shopping/application/create-list/create-list-dto';
import { ShoppingList } from 'modules/shopping/domain/entities/shopping-list';

export interface ICreateListDTO {
  userId: string;
  name: string;
}

interface IShoppingList {
  create(data: ICreateListRequestDTO): Promise<ShoppingList>;
}

export { IShoppingList };
