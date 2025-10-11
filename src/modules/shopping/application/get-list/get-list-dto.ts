interface IGetListRequestDTO {
  listId: string;
}

interface IGetListDTO {
  userId?: string;
  listId?: string;
}

export { IGetListRequestDTO, IGetListDTO };
