interface ICreateItemRequestDTO {
  name: string;
  shoppingListId?: string;
  userId?: string;
}

interface ICreateItemDTO {
  name: string;
  shoppingListId: string;
  userId: string;
}

export { ICreateItemRequestDTO, ICreateItemDTO };
