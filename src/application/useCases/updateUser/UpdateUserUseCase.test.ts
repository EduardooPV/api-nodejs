import { describe, it, beforeEach, expect, jest } from '@jest/globals';
import { IUsersRepository } from '../../../domains/users/repositories/IUserRepository';
import { UpdateUserUseCase } from './UpdateUserUseCase';
import { User } from '../../../domains/users/entities/User';

describe('UpdateUserUseCase', () => {
  let usersRepository: jest.Mocked<IUsersRepository>;
  let updateUserUseCase: UpdateUserUseCase;

  beforeEach(() => {
    usersRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
      findAllPaginated: jest.fn(),
      findById: jest.fn(),
      deleteById: jest.fn(),
      updateById: jest.fn(),
    };
    updateUserUseCase = new UpdateUserUseCase(usersRepository);
  });

  it('should update a user if id exist', async () => {
    const params = { id: '1' };

    const userData = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    usersRepository.findById.mockResolvedValue(userData);

    await updateUserUseCase.execute(params, userData);

    expect(usersRepository.findById).toHaveBeenCalledWith(params.id);
    expect(usersRepository.updateById).toHaveBeenCalledWith(params.id, userData);

    const updatedUser = (usersRepository.updateById as jest.Mock).mock.calls[0][1] as User;

    expect(updatedUser.email).toBe(userData.email);
    expect(updatedUser.name).toBe(userData.name);
  });
});
