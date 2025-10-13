import type { OpenAPIV3_1 } from 'openapi-types';

export const updateUserDocs: OpenAPIV3_1.PathsObject = {
  '/users': {
    put: {
      tags: ['Users'],
      summary: 'Update authenticated user',
      operationId: 'updateAuthenticatedUser',
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UpdateUserRequest' },
          },
        },
      },
      responses: {
        200: {
          description: 'User updated successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/User' },
            },
          },
        },
        400: { $ref: '#/components/responses/BadRequest' },
        401: { $ref: '#/components/responses/Unauthorized' },
        404: { $ref: '#/components/responses/NotFound' },
        500: { $ref: '#/components/responses/InternalError' },
      },
    },
  },
};
