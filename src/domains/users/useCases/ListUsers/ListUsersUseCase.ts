import { IPaginatedResponse } from '../../../../shared/interfaces/IPaginatedResponse';
import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUserRepository';
import { IListUsersRequestDTO } from './ListUserDTO';

class ListUsersUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: IListUsersRequestDTO): Promise<IPaginatedResponse<User>> {
    const { page, perPage } = data;

    const users = await this.userRepository.listUsers(page, perPage);

    return users;
  }
}
export { ListUsersUseCase };
