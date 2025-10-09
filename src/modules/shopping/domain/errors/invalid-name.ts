import { AppError } from 'shared/errors/app-error';

class InvalidName extends AppError {
  constructor(details?: { reason: 'missing' | 'format' }) {
    super('INVALID_NAME', 'Invalid name.', details);
  }
}

export { InvalidName };
