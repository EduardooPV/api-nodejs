import { AppError } from 'shared/errors/AppError';

class UserNotFound extends AppError {
  constructor() {
    super('USER_NOT_FOUND', 'User not found.');
  }
}

export { UserNotFound };
