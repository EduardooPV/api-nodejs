import { AppError } from 'shared/errors/AppError';

class InvalidUserIdError extends AppError {
  constructor(details?: { reason: 'missing' | 'format' }) {
    super('INVALID_USER_ID', 'Invalid user id.', details);
  }
}

export { InvalidUserIdError };
