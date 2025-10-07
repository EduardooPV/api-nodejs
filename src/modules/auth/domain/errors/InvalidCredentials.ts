import { AppError } from 'shared/errors/AppError';

class InvalidCredentials extends AppError {
  constructor() {
    super('INVALID_CREDENTIALS', 'Invalid email or password.');
  }
}

export { InvalidCredentials };
