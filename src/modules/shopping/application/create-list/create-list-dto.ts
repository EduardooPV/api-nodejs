interface ICreateListRequestDTO {
  name: string;
  userId?: string;
}

interface ICreateListDTO {
  userId: string;
  name: string;
}

export { ICreateListRequestDTO, ICreateListDTO };
