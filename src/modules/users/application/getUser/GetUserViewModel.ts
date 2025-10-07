import { User } from 'modules/users/domain/entities/User';

interface GetUserViewModelResponse {
  id: string;
  name: string;
  email: string;
}

class GetUserViewModel {
  static toHTTP(user: User): GetUserViewModelResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}

export { GetUserViewModel };
