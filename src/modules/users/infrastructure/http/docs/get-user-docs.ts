import type { OpenAPIV3_1 } from 'openapi-types';

export const getUserDocs: OpenAPIV3_1.PathsObject = {
  '/users': {
    get: {
      tags: ['Users'],
      summary: 'Get authenticated user profile',
      operationId: 'getAuthenticatedUser',
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: 'Authenticated user retrieved successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/GetUserRequest' },
            },
          },
        },
        401: { $ref: '#/components/responses/Unauthorized' },
        404: { $ref: '#/components/responses/NotFound' },
        500: { $ref: '#/components/responses/InternalError' },
      },
    },
  },
};
