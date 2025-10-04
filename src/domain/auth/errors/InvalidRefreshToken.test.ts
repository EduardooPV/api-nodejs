import { describe, it, expect } from '@jest/globals';
import { InvalidRefreshToken } from './InvalidRefreshToken';

describe('InvalidRefreshToken Error', () => {
  it('should create an error with correct code and message', () => {
    const error = new InvalidRefreshToken();

    expect(error).toBeInstanceOf(InvalidRefreshToken);
    expect(error.code).toBe('INVALID_REFRESH_TOKEN');
    expect(error.message).toBe('Invalid refresh token.');
    expect(error.isOperational).toBe(true);
  });
});
