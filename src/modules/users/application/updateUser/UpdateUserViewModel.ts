import { User } from 'modules/users/domain/entities/User';

interface IUpdateUserViewModelResponse {
  name: string;
  email: string;
}

class UpdateUserViewModel {
  static toHTTP(user: User): IUpdateUserViewModelResponse {
    return {
      name: user.name,
      email: user.email,
    };
  }
}

export { UpdateUserViewModel };
