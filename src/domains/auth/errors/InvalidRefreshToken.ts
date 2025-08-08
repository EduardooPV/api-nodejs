import { AppError } from '../../../shared/errors/AppError';

class InvalidRefreshToken extends AppError {
  constructor() {
    super('Invalid refresh token', 401);
  }
}

export { InvalidRefreshToken };
