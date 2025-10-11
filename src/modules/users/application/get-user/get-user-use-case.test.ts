import { describe, it, beforeEach, expect, jest } from '@jest/globals';
import { GetUserUseCase } from './get-user-use-case';
import { User } from 'modules/users/domain/entities/user';
import { IUsersRepository } from 'modules/users/domain/repositories/user-repository';
import { InvalidUserIdError } from 'modules/users/domain/errors/invalid-user-id-error';
import { UserNotFound } from 'modules/users/domain/errors/user-not-found';

describe('GetUserUseCase', () => {
  let usersRepository: jest.Mocked<IUsersRepository>;
  let getUserUseCase: GetUserUseCase;

  beforeEach(() => {
    usersRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
      findById: jest.fn(),
      deleteById: jest.fn(),
      updateById: jest.fn(),
      updateRefreshToken: jest.fn(),
    };
    getUserUseCase = new GetUserUseCase(usersRepository);
  });

  it('should return the user when id is valid and user exists', async () => {
    const params = { id: '1' };

    usersRepository.findById.mockResolvedValue({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    const user = (await getUserUseCase.execute(params)) as User;

    expect(usersRepository.findById).toHaveBeenCalledWith(params.id);
    expect(user.id).toBe('1');
    expect(user.name).toBe('John Doe');
  });

  it('should throw InvalidUserIdError if id is missing', async () => {
    // @ts-expect-error
    await expect(getUserUseCase.execute({ id: null })).rejects.toBeInstanceOf(InvalidUserIdError);
  });

  it('should throw UserNotFound if no user exists with given id', async () => {
    const params = { id: '999' };

    usersRepository.findById.mockResolvedValue(null);

    await expect(getUserUseCase.execute(params)).rejects.toBeInstanceOf(UserNotFound);
    expect(usersRepository.findById).toHaveBeenCalledWith(params.id);
  });
});
