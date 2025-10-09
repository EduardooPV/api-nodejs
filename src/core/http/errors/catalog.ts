type ErrorCode =
  | 'INVALID_CREDENTIALS'
  | 'MISSING_AUTH_HEADER'
  | 'INVALID_ACCESS_TOKEN'
  | 'INVALID_REFRESH_TOKEN'
  | 'USER_ALREADY_EXISTS'
  | 'USER_NOT_FOUND'
  | 'INVALID_USER_ID'
  | 'BAD_REQUEST'
  | 'VALIDATION_ERROR'
  | 'INTERNAL_ERROR';

class HttpStatusMapper {
  private static readonly CODE_TO_STATUS: Readonly<Record<ErrorCode, number>> = {
    INVALID_CREDENTIALS: 401,
    MISSING_AUTH_HEADER: 401,
    INVALID_ACCESS_TOKEN: 401,
    INVALID_REFRESH_TOKEN: 401,
    USER_ALREADY_EXISTS: 409,
    USER_NOT_FOUND: 404,
    INVALID_USER_ID: 400,
    BAD_REQUEST: 400,
    VALIDATION_ERROR: 400,
    INTERNAL_ERROR: 500,
  } as const;

  public static getStatusFor(code: string): number {
    return this.CODE_TO_STATUS[code as ErrorCode] ?? 400;
  }
}

export { ErrorCode, HttpStatusMapper };
