import { IPaginatedResponse } from '../../../../shared/interfaces/IPaginatedResponse';
import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUserRepository';
import { IListUsersRequestDTO } from './ListUsersDTO';

class ListUsersUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: IListUsersRequestDTO): Promise<IPaginatedResponse<User>> {
    const { page, perPage, name, email, orderBy, orderDirection } = data;

    const users = await this.userRepository.findAllPaginated(
      page,
      perPage,
      name,
      email,
      orderBy,
      orderDirection,
    );

    return users;
  }
}
export { ListUsersUseCase };
