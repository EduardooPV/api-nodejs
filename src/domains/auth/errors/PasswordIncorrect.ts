import { AppError } from '../../../shared/errors/AppError';

class PasswordIncorrectError extends AppError {
  constructor() {
    super(`Password invalid.`, 401);
  }
}

export { PasswordIncorrectError };
