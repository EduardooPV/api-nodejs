/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, beforeEach, expect, jest } from '@jest/globals';
import { IUsersRepository } from '@domain/users/repositories/IUserRepository';
import { UpdateUserUseCase } from './UpdateUserUseCase';
import { User } from '@domain/users/entities/User';
import { InvalidUserIdError } from '@domain/users/errors/InvalidUserIdError';
import { UserNotFound } from '@domain/users/errors/UserNotFound';

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
      updateRefreshToken: jest.fn(),
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

  it('should throw if user id is missing', async () => {
    await expect(updateUserUseCase.execute({ id: null as any }, {} as any)).rejects.toThrow(
      InvalidUserIdError,
    );
  });

  it('should throw if user does not exist', async () => {
    usersRepository.findById.mockResolvedValue(null);
    await expect(updateUserUseCase.execute({ id: '999' }, {} as any)).rejects.toThrow(UserNotFound);
  });
});
