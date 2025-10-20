interface ICreateItemRequestDTO {
  name: string;
  shoppingListId?: string;
  userId?: string;
  status: string;
  quantity: number;
  amount: number;
}

export { ICreateItemRequestDTO };
