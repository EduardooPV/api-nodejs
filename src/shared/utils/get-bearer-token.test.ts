import { describe, it, expect } from '@jest/globals';
import { getBearerToken } from './get-bearer-token';

describe('getBearerToken', () => {
  it('should return null if authorization is undefined', () => {
    expect(getBearerToken(undefined)).toBeNull();
  });

  it('should return null if authorization is null', () => {
    // @ts-expect-error
    expect(getBearerToken(null)).toBeNull();
  });

  it('should return null if scheme is not Bearer', () => {
    expect(getBearerToken('Basic abc123')).toBeNull();
    expect(getBearerToken('Token xyz')).toBeNull();
    expect(getBearerToken('')).toBeNull();
  });

  it('should return null if Bearer has no token', () => {
    expect(getBearerToken('Bearer')).toBeNull();
    expect(getBearerToken('Bearer ')).toBeNull();
  });

  it('should return the token when scheme is valid Bearer', () => {
    expect(getBearerToken('Bearer abc123')).toBe('abc123');
  });

  it('should accept case-insensitive Bearer scheme', () => {
    expect(getBearerToken('bearer abc123')).toBe('abc123');
    expect(getBearerToken('BEARER xyz789')).toBe('xyz789');
  });

  it('should ignore extra spaces between scheme and token', () => {
    expect(getBearerToken('Bearer     token123')).toBe('token123');
  });
});
