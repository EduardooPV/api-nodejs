import { describe, it, beforeEach, expect, jest } from '@jest/globals';
import { IUsersRepository } from '../../repositories/IUserRepository';
import { FindUserByIdUseCase } from './FindUserByIdUseCase';
import { User } from '../../entities/User';

describe('FindUserByIdUseCase', () => {
  let usersRepository: jest.Mocked<IUsersRepository>;
  let findUserByIdUseCase: FindUserByIdUseCase;

  beforeEach(() => {
    usersRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
      listUsers: jest.fn(),
      findById: jest.fn(),
      deleteById: jest.fn(),
      updateUserById: jest.fn(),
    };
    findUserByIdUseCase = new FindUserByIdUseCase(usersRepository);
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

    const user = (await findUserByIdUseCase.execute(params)) as User;

    expect(usersRepository.findById).toHaveBeenCalledWith(params.id);

    expect(user.id).toEqual('1');
  });
});
