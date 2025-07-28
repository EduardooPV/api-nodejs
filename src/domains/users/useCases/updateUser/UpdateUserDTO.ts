interface IUpdateUserRequestDTO {
  name: string;
  email: string;
  password: string;
}

interface IUpdateUserParamsDTO {
  id?: string;
}
export { IUpdateUserRequestDTO, IUpdateUserParamsDTO };
