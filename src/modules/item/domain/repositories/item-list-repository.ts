import { ICreateItemRequestDTO } from 'modules/item/application/create-item/create-item-dto';
import { ItemList } from 'modules/item/domain/entities/item-list';
import { IGetAllItemsByShoppingIdDTO } from 'modules/item/application/get-all-items-by-shopping-id/get-all-items-by-shopping-id-dto';
import { IDeleteItemByIdDTO } from 'modules/item/application/delete-item-by-id/delete-item-by-id-dto';
import { IGetItemByIdDTO } from 'modules/item/application/get-item-by-id/get-item-by-id-dto';

interface IItemList {
  create(data: ICreateItemRequestDTO): Promise<ItemList>;
  getAllItemsByShoppingId(data: IGetAllItemsByShoppingIdDTO): Promise<ItemList[]>;
  deleteItemById(data: IDeleteItemByIdDTO): Promise<void>;
  getItemById(data: IGetItemByIdDTO): Promise<ItemList | null>;
  updateItemById(data: Partial<ItemList>): Promise<ItemList>;
}

export { IItemList };
