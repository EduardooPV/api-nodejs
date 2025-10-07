import { AppError } from 'shared/errors/AppError';

class InvalidName extends AppError {
  constructor(details?: { reason: 'missing' | 'format' }) {
    super('INVALID_NAME', 'Invalid name.', details);
  }
}

export { InvalidName };
