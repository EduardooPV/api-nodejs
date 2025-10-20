interface IUpdateItemByIdRequestDTO {
  shoppingListId?: string;
  itemId?: string;
  userId?: string;

  name?: string;
  status?: string;
  amount?: number;
  quantity?: number;
}

interface IUpdateItemByIdDTO {
  shoppingListId?: string;
  itemId?: string;
  userId?: string;

  name?: string;
  status?: string;
  amount?: number;
  quantity?: number;
}

export { IUpdateItemByIdRequestDTO, IUpdateItemByIdDTO };
