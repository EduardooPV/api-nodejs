interface IUpdateUserByIdRequestDTO {
  name: string;
  email: string;
  password: string;
}

interface IUpdateUserByIdParamsDTO {
  id?: string;
}
export { IUpdateUserByIdRequestDTO, IUpdateUserByIdParamsDTO };
