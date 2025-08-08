import { AppError } from '../../../shared/errors/AppError';

class EmailNotFound extends AppError {
  constructor() {
    super(`Email invalid.`, 401);
  }
}

export { EmailNotFound };
