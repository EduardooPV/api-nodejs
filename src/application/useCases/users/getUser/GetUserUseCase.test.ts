import { describe, it, beforeEach, expect, jest } from '@jest/globals';
import { IUsersRepository } from '../../../domains/users/repositories/IUserRepository';
import { GetUserUseCase } from './GetUserUseCase';
import { User } from '../../../domains/users/entities/User';

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
