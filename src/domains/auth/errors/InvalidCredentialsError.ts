import { AppError } from '../../../shared/errors/AppError';

class InvalidCredentialsError extends AppError {
  constructor(email: string) {
    super(`Invalid credentials for user with email "${email}".`, 401);
  }
}

export { InvalidCredentialsError };
