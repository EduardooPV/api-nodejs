import { IUsersRepository } from '../../../domains/users/repositories/IUserRepository';
import { ListUsersUseCase } from './ListUsersUseCase';

describe('ListUsersListCase', () => {
  let usersRepository: jest.Mocked<IUsersRepository>;
  let listUsersUseCase: ListUsersUseCase;

  beforeEach(() => {
    usersRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
      findAllPaginated: jest.fn(),
      findById: jest.fn(),
      deleteById: jest.fn(),
      updateById: jest.fn(),
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

    const queryParams = {
      page: 1,
      perPage: 10,
      name: 'John',
      email: 'john',
    };

    usersRepository.findAllPaginated.mockResolvedValue(users);

    const result = await listUsersUseCase.execute(queryParams);

    expect(usersRepository.findAllPaginated).toHaveBeenCalled();
    expect(usersRepository.findAllPaginated).toHaveBeenCalledTimes(1);
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
