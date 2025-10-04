import { describe, it, beforeEach, expect, jest } from '@jest/globals';
import { GetUserUseCase } from './GetUserUseCase';
import { User } from '@domain/users/entities/User';
import { IUsersRepository } from '@domain/users/repositories/IUserRepository';

describe('GetUserUseCase', () => {
  let usersRepository: jest.Mocked<IUsersRepository>;
  let getUserUseCase: GetUserUseCase;

  beforeEach(() => {
    usersRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
      findAllPaginated: jest.fn(),
      findById: jest.fn(),
      deleteById: jest.fn(),
      updateById: jest.fn(),
      updateRefreshToken: jest.fn(),
    };
    getUserUseCase = new GetUserUseCase(usersRepository);
  });

  it('should return user', async () => {
    const params = {
      id: '1',
    };

    usersRepository.findById.mockResolvedValue({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    const user = (await getUserUseCase.execute(params)) as User;

    expect(usersRepository.findById).toHaveBeenCalledWith(params.id);

    expect(user.id).toEqual('1');
  });
});
