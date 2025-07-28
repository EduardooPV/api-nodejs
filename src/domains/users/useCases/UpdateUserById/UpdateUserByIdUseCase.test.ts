import { describe, it, beforeEach, expect, jest } from '@jest/globals';
import { IUsersRepository } from '../../repositories/IUserRepository';
import { UpdateUserByIdUseCase } from './UpdateUserByIdUseCase';
import { User } from '../../entities/User';

describe('UpdateUserByIdUseCase', () => {
  let usersRepository: jest.Mocked<IUsersRepository>;
  let updateUserByIdUseCase: UpdateUserByIdUseCase;

  beforeEach(() => {
    usersRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
      listUsers: jest.fn(),
      findById: jest.fn(),
      deleteById: jest.fn(),
      updateUserById: jest.fn(),
    };
    updateUserByIdUseCase = new UpdateUserByIdUseCase(usersRepository);
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

    await updateUserByIdUseCase.execute(params, userData);

    expect(usersRepository.findById).toHaveBeenCalledWith(params.id);
    expect(usersRepository.updateUserById).toHaveBeenCalledWith(params.id, userData);

    const updatedUser = (usersRepository.updateUserById as jest.Mock).mock.calls[0][1] as User;

    expect(updatedUser.email).toBe(userData.email);
    expect(updatedUser.name).toBe(userData.name);
  });
});
