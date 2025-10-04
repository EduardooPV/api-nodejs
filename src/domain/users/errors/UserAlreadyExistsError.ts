import { AppError } from '@shared/errors/AppError';

class UserAlreadyExistsError extends AppError {
  constructor(email?: string) {
    super('USER_ALREADY_EXISTS', 'User already exists.', email != null ? { email } : undefined);
  }
}

export { UserAlreadyExistsError };
