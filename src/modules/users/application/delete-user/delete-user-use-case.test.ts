import { describe, it, beforeEach, expect, jest } from '@jest/globals';
import { DeleteUserUseCase } from './delete-user-use-case';
import { IUsersRepository } from 'modules/users/domain/repositories/user-repository';
import { InvalidUserIdError } from 'modules/users/domain/errors/invalid-user-id-error';
import { UserNotFound } from 'modules/users/domain/errors/user-not-found';

describe('DeleteUserUseCase', () => {
  let usersRepository: jest.Mocked<IUsersRepository>;
  let deleteUserUseCase: DeleteUserUseCase;

  beforeEach(() => {
    usersRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
      findById: jest.fn(),
      deleteById: jest.fn(),
      updateById: jest.fn(),
      updateRefreshToken: jest.fn(),
    };
    deleteUserUseCase = new DeleteUserUseCase(usersRepository);
  });

  it('should delete user by id', async () => {
    const params = { id: '1' };

    usersRepository.findById.mockResolvedValue({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    await deleteUserUseCase.execute(params);

    expect(usersRepository.findById).toHaveBeenCalledWith(params.id);
    expect(usersRepository.deleteById).toHaveBeenCalledWith(params.id);
  });

  it('should throw InvalidUserIdError if id is missing', async () => {
    // @ts-expect-error
    await expect(deleteUserUseCase.execute({ id: null })).rejects.toBeInstanceOf(
      InvalidUserIdError,
    );
  });

  it('should throw UserNotFound if user does not exist', async () => {
    const params = { id: '999' };

    usersRepository.findById.mockResolvedValue(null);

    await expect(deleteUserUseCase.execute(params)).rejects.toBeInstanceOf(UserNotFound);
    expect(usersRepository.findById).toHaveBeenCalledWith(params.id);
    expect(usersRepository.deleteById).not.toHaveBeenCalled();
  });
});
