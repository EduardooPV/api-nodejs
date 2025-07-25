import { AppError } from '../../../shared/errors/AppError';

class UserAlreadyExistsError extends AppError {
  constructor(email: string) {
    super(`User with email "${email}" already exists.`, 409);
  }
}

export { UserAlreadyExistsError };
