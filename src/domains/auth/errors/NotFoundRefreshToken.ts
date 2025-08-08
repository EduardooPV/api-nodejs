import { AppError } from '../../../shared/errors/AppError';

class NotFoundRefreshToken extends AppError {
  constructor() {
    super('Refresh token not provided', 401);
  }
}

export { NotFoundRefreshToken };
