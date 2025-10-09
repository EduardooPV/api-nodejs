import { IPaginatedResponse } from 'shared/interfaces/paginated-response';
import { User } from 'modules/users/domain/entities/user';
import { IUsersRepository } from 'modules/users/domain/repositories/user-repository';
import { IListUsersRequestDTO } from './list-users-dto';

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
