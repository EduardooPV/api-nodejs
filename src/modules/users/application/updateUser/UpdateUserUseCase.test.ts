/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, beforeEach, expect, jest } from '@jest/globals';
import { IUsersRepository } from 'modules/users/domain/repositories/IUserRepository';
import { UpdateUserUseCase } from './UpdateUserUseCase';
import { User } from 'modules/users/domain/entities/User';
import { InvalidUserIdError } from 'modules/users/domain/errors/InvalidUserIdError';
import { UserNotFound } from 'modules/users/domain/errors/UserNotFound';
import { UserAlreadyExistsError } from 'modules/users/domain/errors/UserAlreadyExistsError';

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

  it('should throw if email already exists', async () => {
    const params = { id: '1' };

    const userData = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    usersRepository.findById.mockResolvedValue(userData);
    usersRepository.findByEmail.mockResolvedValue({
      id: '2',
      name: 'Jane Doe',
      email: 'john.doe@example.com',
      password: 'password456',
    });

    await expect(updateUserUseCase.execute(params, userData)).rejects.toThrow(
      UserAlreadyExistsError,
    );
  });
});
