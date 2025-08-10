import { AppError } from '../../../shared/errors/AppError';

class MissingAuthHeader extends AppError {
  constructor() {
    super('MISSING_AUTH_HEADER', 'Authorization header is required.');
  }
}

export { MissingAuthHeader };
