import { ZodError } from 'zod';
import { AppError } from '@shared/errors/AppError';
import { getStatusFor } from './catalog';
import { HttpError } from '@infrastructure/http/interfaces/IHttpError';

function errorToHttp(error: unknown): HttpError {
  if (error instanceof AppError) {
    return {
      status: getStatusFor(error.code),
      body: { error: { code: error.code, message: error.message, details: error.details } },
    };
  }

  if (error instanceof ZodError) {
    return {
      status: getStatusFor('VALIDATION_ERROR'),
      body: {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid request data.',
          issues: error.issues.map((i) => ({ path: i.path, message: i.message })),
        },
      },
    };
  }

  if (error instanceof SyntaxError) {
    return {
      status: getStatusFor('BAD_REQUEST'),
      body: { error: { code: 'BAD_REQUEST', message: 'Malformed JSON body.' } },
    };
  }

  return {
    status: getStatusFor('INTERNAL_ERROR'),
    body: { error: { code: 'INTERNAL_ERROR', message: 'Internal Server Error' } },
  };
}

export { errorToHttp };
