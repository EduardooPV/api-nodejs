import { InvalidUserIdError } from './InvalidUserIdError';
import { AppError } from '@shared/errors/AppError';

describe('InvalidUserIdError', () => {
  it('should be an instance of AppError', () => {
    const error = new InvalidUserIdError({ reason: 'missing' });

    expect(error).toBeInstanceOf(AppError);
    expect(error).toBeInstanceOf(InvalidUserIdError);
  });

  it('should have correct code and message', () => {
    const error = new InvalidUserIdError({ reason: 'format' });

    expect(error.code).toBe('INVALID_USER_ID');
    expect(error.message).toBe('Invalid user id.');
    expect(error.details).toEqual({ reason: 'format' });
  });
});
