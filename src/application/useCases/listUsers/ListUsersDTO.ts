interface IListUsersRequestDTO {
  page: number;
  perPage: number;
  name?: string;
  email?: string;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

export { IListUsersRequestDTO };
