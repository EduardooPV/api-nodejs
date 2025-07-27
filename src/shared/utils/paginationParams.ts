import { IncomingMessage } from 'http';
import { parse } from 'url';
import { IPaginationParams } from '../interfaces/IPaginationParams';

export function getPaginationParams(
  request: IncomingMessage,
  defaultPerPage = 10,
  maxPerPage = 10,
): IPaginationParams {
  const url = typeof request.url === 'string' ? request.url : '';
  const { query } = parse(url, true);

  const page = Math.max(parseInt(query.page as string) || 1, 1);
  const perPage = Math.min(
    Math.max(parseInt(query.perPage as string) || defaultPerPage, 1),
    maxPerPage,
  );

  return {
    page,
    perPage,
    skip: (page - 1) * perPage,
    take: perPage,
  };
}
