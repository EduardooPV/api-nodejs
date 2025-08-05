import { describe, it, beforeEach, expect, jest } from '@jest/globals';
import { IUsersRepository } from '../../../domains/users/repositories/IUserRepository';
import { CreateUserUseCase } from './CreateUserUseCase';
import { User } from '../../../domains/users/entities/User';

describe('CreateUserUseCase', () => {
  let usersRepository: jest.Mocked<IUsersRepository>;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    usersRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
      findAllPaginated: jest.fn(),
      findById: jest.fn(),
      deleteById: jest.fn(),
      updateById: jest.fn(),
    };
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it('should create a user if email does not exist', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    usersRepository.findByEmail.mockResolvedValue(null);

    await createUserUseCase.execute(userData);

    expect(usersRepository.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(usersRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      }),
    );

    const createdUser = (usersRepository.create as jest.Mock).mock.calls[0][0] as User;

    expect(createdUser.email).toBe(userData.email);
    expect(createdUser.name).toBe(userData.name);
  });
});
