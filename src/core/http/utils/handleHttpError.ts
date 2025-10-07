import { ServerResponse } from 'http';
import { env } from 'shared/utils/env';
import { AppError } from 'shared/errors/AppError';
import { errorToHttp } from 'core/http/errors/translator';

function json(res: ServerResponse, status: number, body: unknown): void {
  const payload = JSON.stringify(body);
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Content-Length', Buffer.byteLength(payload).toString());
  res.end(payload);
}

function handleHttpError(error: unknown, res: ServerResponse): void {
  const { status, body } = errorToHttp(error);

  if (env.nodeEnv !== 'production' && error instanceof AppError) {
    (body as { error: { stack?: string } }).error.stack = (error as Error).stack ?? '';
  }

  json(res, status, body);
}

export { handleHttpError };
