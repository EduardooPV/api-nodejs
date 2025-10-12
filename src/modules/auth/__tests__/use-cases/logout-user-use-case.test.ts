// @ts-nocheck
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import jsonwebtoken from 'jsonwebtoken';
import { InvalidRefreshToken } from 'modules/auth/domain/errors/invalid-refresh-token';
import { UserNotFound } from 'modules/users/domain/errors/user-not-found';
import { LogoutUserUseCase } from 'modules/auth/application/logout-user/logout-user-use-case';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

const mockedJwt = jsonwebtoken as jest.Mocked<typeof jsonwebtoken>;

describe('LogoutUserUseCase', () => {
  let userRepository: {
    findById: jest.Mock;
    updateRefreshToken: jest.Mock;
  };
  let logoutUserUseCase: LogoutUserUseCase;

  beforeEach(() => {
    userRepository = {
      findById: jest.fn(),
      updateRefreshToken: jest.fn(),
    };

    logoutUserUseCase = new LogoutUserUseCase(userRepository);
    jest.clearAllMocks();
  });

  it('should successfully logout when refresh token is valid', async () => {
    const validRefreshToken = 'valid-refresh-token';
    const mockUser = { id: 'user-123', refreshToken: validRefreshToken };

    mockedJwt.verify.mockReturnValueOnce({ sub: 'user-123' });

    userRepository.findById.mockResolvedValueOnce(mockUser);

    await logoutUserUseCase.execute(validRefreshToken);

    expect(mockedJwt.verify).toHaveBeenCalledWith(validRefreshToken, expect.any(String));
    expect(userRepository.findById).toHaveBeenCalledWith('user-123');
    expect(userRepository.updateRefreshToken).toHaveBeenCalledWith('user-123', null);
  });

  it('should throw InvalidRefreshToken when token is invalid', async () => {
    mockedJwt.verify.mockImplementationOnce(() => {
      throw new Error('Invalid token');
    });

    await expect(logoutUserUseCase.execute('invalid-token')).rejects.toBeInstanceOf(
      InvalidRefreshToken,
    );
  });

  it('should throw UserNotFound when user does not exist', async () => {
    mockedJwt.verify.mockReturnValueOnce({ sub: 'user-123' });

    userRepository.findById.mockResolvedValueOnce(null);

    await expect(logoutUserUseCase.execute('valid-token')).rejects.toBeInstanceOf(UserNotFound);
  });

  it('should throw InvalidRefreshToken when user has no stored refresh token', async () => {
    mockedJwt.verify.mockReturnValueOnce({ sub: 'user-123' });

    userRepository.findById.mockResolvedValueOnce({ id: 'user-123', refreshToken: null });

    await expect(logoutUserUseCase.execute('valid-token')).rejects.toBeInstanceOf(
      InvalidRefreshToken,
    );
  });
});
