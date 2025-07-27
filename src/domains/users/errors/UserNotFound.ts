import { AppError } from '../../../shared/errors/AppError';

class UserNotFound extends AppError {
  constructor() {
    super(`User not found.`, 409);
  }
}

export { UserNotFound };
