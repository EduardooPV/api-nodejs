import { AppError } from 'shared/errors/app-error';

class HttpErrorMapper {
  private static readonly codeToStatus: Readonly<Record<string, number>> = {
    INVALID_CREDENTIALS: 401,
    USER_ALREADY_EXISTS: 409,
    USER_NOT_FOUND: 404,
    INVALID_REFRESH_TOKEN: 401,
  };

  static toHttp(error: unknown): { status: number; body: unknown } {
    if (error instanceof AppError) {
      const status = this.codeToStatus[error.code] ?? 400;
      return {
        status,
        body: {
          error: {
            code: error.code,
            message: error.message,
            details: error.details,
          },
        },
      };
    }

    return {
      status: 500,
      body: {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Internal Server Error',
        },
      },
    };
  }
}

export { HttpErrorMapper };
