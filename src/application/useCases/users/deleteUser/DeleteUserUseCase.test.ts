import { describe, it, beforeEach, expect, jest } from '@jest/globals';
import { IUsersRepository } from '../../../../domains/users/repositories/IUserRepository';
import { DeleteUserUseCase } from './DeleteUserUseCase';

describe('DeleteUserUseCase', () => {
  let usersRepository: jest.Mocked<IUsersRepository>;
  let deleteUserUseCase: DeleteUserUseCase;

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
    deleteUserUseCase = new DeleteUserUseCase(usersRepository);
  });

  it('should delete user by id', async () => {
    const params = {
      id: '1',
    };

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
});
