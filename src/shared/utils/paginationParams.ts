import { IncomingMessage } from 'http';
import { IPaginationParams } from 'shared/interfaces/IPaginationParams';

function getPaginationParams(
  request: IncomingMessage,
  defaultPerPage = 10,
  maxPerPage = 10,
): IPaginationParams {
  const base = 'http://localhost';
  const u = new URL(request.url ?? '/', base);

  const pageRaw = u.searchParams.get('page');
  const perPageRaw = u.searchParams.get('per_page') ?? u.searchParams.get('perPage');

  const page = clamp(parseInt(pageRaw ?? '1', 10), 1, Number.MAX_SAFE_INTEGER);
  const perPage = clamp(parseInt(perPageRaw ?? String(defaultPerPage), 10), 1, maxPerPage);

  return {
    page,
    perPage,
    skip: (page - 1) * perPage,
    take: perPage,
  };
}

function clamp(n: number, min: number, max: number): number {
  if (Number.isNaN(n)) return min;
  return Math.max(min, Math.min(n, max));
}

export { getPaginationParams };
