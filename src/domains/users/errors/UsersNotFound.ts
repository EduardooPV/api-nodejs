import { AppError } from '../../../shared/errors/AppError';

class UsersNotFound extends AppError {
  constructor() {
    super(`Users not found.`, 409);
  }
}

export { UsersNotFound };
