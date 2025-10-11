import { ShoppingList } from 'modules/shopping/domain/entities/shopping-list';

interface IGetListViewModelResponse {
  name: string;
  id: string;
}

class GetListViewModel {
  static toHTTP(list: ShoppingList): IGetListViewModelResponse {
    return {
      name: list.name,
      id: list.id,
    };
  }
}

export { GetListViewModel };
