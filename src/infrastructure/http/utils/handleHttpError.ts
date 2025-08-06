import { ServerResponse } from 'http';
import { AppError } from '../../../shared/errors/AppError';

function handleHttpError(error: unknown, response: ServerResponse): void {
  const isAppError = error instanceof AppError;

  const statusCode = isAppError ? error.statusCode : 500;
  const message = isAppError ? error.message : 'Internal server error';

  response.writeHead(statusCode, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({ message }));
}

export { handleHttpError };
