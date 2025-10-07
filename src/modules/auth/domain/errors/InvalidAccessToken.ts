import { AppError } from 'shared/errors/AppError';

class InvalidAccessToken extends AppError {
  constructor(details?: { reason?: 'malformed' | 'signature' | 'expired' }) {
    super('INVALID_ACCESS_TOKEN', 'Invalid access token.', details);
  }
}

export { InvalidAccessToken };
