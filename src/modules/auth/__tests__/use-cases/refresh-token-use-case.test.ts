// @ts-nocheck
import { InvalidRefreshToken } from 'modules/auth/domain/errors/invalid-refresh-token';
import { UserNotFound } from 'modules/users/domain/errors/user-not-found';
import jsonwebtoken from 'jsonwebtoken';
import { env } from 'shared/utils/env';
import { RefreshTokenUseCase } from 'modules/auth/application/refresh-token/refresh-token-use-case';

const mockUserRepository: unknown = {
  findById: jest.fn(),
  updateRefreshToken: jest.fn(),
  findByEmail: jest.fn(),
  create: jest.fn(),
  deleteById: jest.fn(),
  updateById: jest.fn(),
};

describe('RefreshTokenUseCase', () => {
  let useCase: RefreshTokenUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new RefreshTokenUseCase(mockUserRepository);
  });

  it('should successfully refresh tokens when given a valid refresh token', async () => {
    const userId = 'user-123';
    const oldRefreshToken = 'old-refresh-token';
    const newAccessToken = 'new-access-token';
    const newRefreshToken = 'new-refresh-token';

    jest.spyOn(jsonwebtoken, 'verify').mockReturnValueOnce({ sub: userId } as unknown);
    jest
      .spyOn(jsonwebtoken, 'sign')
      .mockReturnValueOnce(newAccessToken)
      .mockReturnValueOnce(newRefreshToken);

    mockUserRepository.findById.mockResolvedValueOnce({
      id: userId,
      refreshToken: oldRefreshToken,
    });

    const result = await useCase.execute(oldRefreshToken);

    expect(jsonwebtoken.verify).toHaveBeenCalledWith(oldRefreshToken, env.refreshSecretJwt);
    expect(jsonwebtoken.sign).toHaveBeenCalledTimes(2);
    expect(mockUserRepository.updateRefreshToken).toHaveBeenCalledWith(userId, newRefreshToken);
    expect(result).toEqual({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });

  it('should throw InvalidRefreshToken if token verification fails', async () => {
    jest.spyOn(jsonwebtoken, 'verify').mockImplementationOnce(() => {
      throw new Error('Invalid token');
    });

    await expect(useCase.execute('invalid-token')).rejects.toBeInstanceOf(InvalidRefreshToken);
  });

  it('should throw UserNotFound if user does not exist', async () => {
    const userId = 'nonexistent-user';
    jest.spyOn(jsonwebtoken, 'verify').mockReturnValueOnce({ sub: userId } as unknown);
    mockUserRepository.findById.mockResolvedValueOnce(null);

    await expect(useCase.execute('valid-token')).rejects.toBeInstanceOf(UserNotFound);
  });

  it('should throw InvalidRefreshToken if stored token does not match', async () => {
    const userId = 'user-123';
    const providedToken = 'provided-refresh-token';
    const storedToken = 'different-token';

    jest.spyOn(jsonwebtoken, 'verify').mockReturnValueOnce({ sub: userId } as unknown);
    mockUserRepository.findById.mockResolvedValueOnce({
      id: userId,
      refreshToken: storedToken,
    });

    await expect(useCase.execute(providedToken)).rejects.toBeInstanceOf(InvalidRefreshToken);
  });
});
