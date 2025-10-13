import type { OpenAPIV3_1 } from 'openapi-types';

export const createUserDocs: OpenAPIV3_1.PathsObject = {
  '/users': {
    post: {
      tags: ['Users'],
      summary: 'Create a new user',
      operationId: 'createUser',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateUserRequest' },
          },
        },
      },
      responses: {
        201: {
          description: 'User created successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateUserRequest' },
            },
          },
        },
        400: { $ref: '#/components/responses/BadRequest' },
        409: { $ref: '#/components/responses/Conflict' },
        500: { $ref: '#/components/responses/InternalError' },
      },
    },
  },
};
