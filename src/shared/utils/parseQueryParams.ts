import { IncomingMessage } from 'http';
import { parse } from 'url';

export function parseQueryParams<T = unknown>(request: IncomingMessage): Partial<T> {
  const url = typeof request.url === 'string' ? request.url : '';
  const parsedUrl = parse(url, true);
  return parsedUrl.query as Partial<T>;
}
