import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';

function buildPaginationResponse<T>(
  items: T[],
  total: number,
  page: number,
  perPage: number,
): IPaginatedResponse<T> {
  const totalPages = Math.ceil(total / perPage);

  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  return {
    items,
    pagination: {
      total,
      page,
      perPage,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    },
  };
}

export { buildPaginationResponse };
