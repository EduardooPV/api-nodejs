import { describe, it, beforeEach, expect, jest } from '@jest/globals';
import { IUsersRepository } from '../../repositories/IUserRepository';
import { DeleteUserByIdUseCase } from './DeleteUserByIdUseCase';

describe('DeleteUserByIdUseCase', () => {
  let usersRepository: jest.Mocked<IUsersRepository>;
  let deleteUserByIdUseCase: DeleteUserByIdUseCase;

  beforeEach(() => {
    usersRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
      listUsers: jest.fn(),
      findById: jest.fn(),
      deleteById: jest.fn(),
      updateUserById: jest.fn(),
    };
    deleteUserByIdUseCase = new DeleteUserByIdUseCase(usersRepository);
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

    await deleteUserByIdUseCase.execute(params);

    expect(usersRepository.findById).toHaveBeenCalledWith(params.id);
    expect(usersRepository.deleteById).toHaveBeenCalledWith(params.id);
  });
});
