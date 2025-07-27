import { IUsersRepository } from '../../repositories/IUserRepository';
import { ListUsersUseCase } from './ListUsersUseCase';

describe('ListUsersListCase', () => {
  let usersRepository: jest.Mocked<IUsersRepository>;
  let listUsersUseCase: ListUsersUseCase;

  beforeEach(() => {
    usersRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
      listUsers: jest.fn(),
    };
    listUsersUseCase = new ListUsersUseCase(usersRepository);
  });

  it('should list all users', async () => {
    const users = {
      items: [
        { id: '1', name: 'John Doe', email: 'john@example.com', password: 'password123' },
        { id: '2', name: 'Jane Doe', email: 'jane@example.com', password: 'password456' },
      ],
      pagination: {
        total: 2,
        page: 1,
        perPage: 10,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };

    usersRepository.listUsers.mockResolvedValue(users);

    const result = await listUsersUseCase.execute({ page: 1, perPage: 10 });

    expect(usersRepository.listUsers).toHaveBeenCalledWith(1, 10);
    expect(usersRepository.listUsers).toHaveBeenCalledTimes(1);
    expect(result).toHaveProperty('items');
    expect(result).toHaveProperty('pagination');
    expect(result.items).toHaveLength(2);
    expect(result.pagination).toEqual({
      total: 2,
      page: 1,
      perPage: 10,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });
  });
});
