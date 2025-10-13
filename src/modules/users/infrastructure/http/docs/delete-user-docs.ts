import type { OpenAPIV3_1 } from 'openapi-types';

export const deleteUserDocs: OpenAPIV3_1.PathsObject = {
  '/users': {
    delete: {
      tags: ['Users'],
      summary: 'Delete authenticated user',
      operationId: 'deleteAuthenticatedUser',
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        204: {
          description: 'User deleted successfully (no content)',
        },
        401: { $ref: '#/components/responses/Unauthorized' },
        404: { $ref: '#/components/responses/NotFound' },
        500: { $ref: '#/components/responses/InternalError' },
      },
    },
  },
};
