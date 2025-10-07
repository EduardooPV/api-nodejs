import { AppError } from 'shared/errors/AppError';

function errorToHttp(e: unknown): { status: number; body: unknown } {
  if (e instanceof AppError) {
    const map: Record<string, number> = {
      INVALID_CREDENTIALS: 401,
      USER_ALREADY_EXISTS: 409,
      USER_NOT_FOUND: 404,
      INVALID_REFRESH_TOKEN: 401,
    };
    const status = map[e.code] ?? 400;
    return { status, body: { error: { code: e.code, message: e.message, details: e.details } } };
  }
  return {
    status: 500,
    body: { error: { code: 'INTERNAL_ERROR', message: 'Internal Server Error' } },
  };
}

export { errorToHttp };
