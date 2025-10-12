// @ts-nocheck
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { InvalidCredentials } from 'modules/auth/domain/errors/invalid-credentials';
import { IUsersRepository } from 'modules/users/domain/repositories/user-repository';
import { env } from 'shared/utils/env';
import { LoginUserUseCase } from 'modules/auth/application/login-user/login-user-use-case';

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('shared/utils/env', () => ({
  env: {
    secretJwt: 'test-secret',
    refreshSecretJwt: 'refresh-secret',
    accessTokenExpiration: '15m',
    refreshTokenExpiration: '7d',
  },
}));

describe('LoginUserUseCase', () => {
  let userRepository: jest.Mocked<IUsersRepository>;
  let useCase: LoginUserUseCase;

  const mockUser = {
    id: 'user-123',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashed-password',
    refreshToken: null,
  };

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      updateRefreshToken: jest.fn(),
    } as unknown as jest.Mocked<IUsersRepository>;

    useCase = new LoginUserUseCase(userRepository);

    jest.clearAllMocks();
  });

  it('should successfully authenticate a valid user', async () => {
    userRepository.findByEmail.mockResolvedValueOnce(mockUser);

    (bcryptjs.compare as jest.Mock).mockResolvedValueOnce(true);
    (jsonwebtoken.sign as jest.Mock)
      .mockReturnValueOnce('access-token')
      .mockReturnValueOnce('refresh-token');

    const result = await useCase.execute({
      email: mockUser.email,
      password: 'plain-password',
    });

    expect(userRepository.findByEmail).toHaveBeenCalledWith(mockUser.email);
    expect(bcryptjs.compare).toHaveBeenCalledWith('plain-password', mockUser.password);
    expect(jsonwebtoken.sign).toHaveBeenNthCalledWith(
      1,
      { sub: mockUser.id },
      env.secretJwt,
      expect.objectContaining({ expiresIn: env.accessTokenExpiration }),
    );
    expect(jsonwebtoken.sign).toHaveBeenNthCalledWith(
      2,
      { sub: mockUser.id },
      env.refreshSecretJwt,
      expect.objectContaining({ expiresIn: env.refreshTokenExpiration }),
    );
    expect(userRepository.updateRefreshToken).toHaveBeenCalledWith(mockUser.id, 'refresh-token');
    expect(result).toEqual({ accessToken: 'access-token', refreshToken: 'refresh-token' });
  });

  it('should throw InvalidCredentials if user is not found', async () => {
    userRepository.findByEmail.mockResolvedValueOnce(null);

    await expect(
      useCase.execute({ email: 'notfound@example.com', password: 'any' }),
    ).rejects.toBeInstanceOf(InvalidCredentials);

    expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(bcryptjs.compare).not.toHaveBeenCalled();
    expect(jsonwebtoken.sign).not.toHaveBeenCalled();
  });

  it('should throw InvalidCredentials if password does not match', async () => {
    userRepository.findByEmail.mockResolvedValueOnce(mockUser);

    (bcryptjs.compare as jest.Mock).mockResolvedValueOnce(false);

    await expect(
      useCase.execute({ email: mockUser.email, password: 'wrong-password' }),
    ).rejects.toBeInstanceOf(InvalidCredentials);

    expect(bcryptjs.compare).toHaveBeenCalledWith('wrong-password', mockUser.password);
    expect(jsonwebtoken.sign).not.toHaveBeenCalled();
  });

  it('should update refresh token in repository after successful login', async () => {
    userRepository.findByEmail.mockResolvedValueOnce(mockUser);

    (bcryptjs.compare as jest.Mock).mockResolvedValueOnce(true);
    (jsonwebtoken.sign as jest.Mock)
      .mockReturnValueOnce('access-token')
      .mockReturnValueOnce('refresh-token');

    await useCase.execute({ email: mockUser.email, password: 'correct-password' });

    expect(userRepository.updateRefreshToken).toHaveBeenCalledWith(mockUser.id, 'refresh-token');
  });

  it('should return valid token strings from jsonwebtoken.sign', async () => {
    userRepository.findByEmail.mockResolvedValueOnce(mockUser);

    (bcryptjs.compare as jest.Mock).mockResolvedValueOnce(true);
    (jsonwebtoken.sign as jest.Mock)
      .mockReturnValueOnce('access-token-value')
      .mockReturnValueOnce('refresh-token-value');

    const result = await useCase.execute({ email: mockUser.email, password: 'password' });

    expect(result.accessToken).toBe('access-token-value');
    expect(result.refreshToken).toBe('refresh-token-value');
  });
});
