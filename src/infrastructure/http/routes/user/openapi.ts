import type { OpenAPIV3_1 } from 'openapi-types';

const userPaths: OpenAPIV3_1.PathsObject = {
  '/users': {
    post: {
      tags: ['Users'],
      summary: 'Create user',
      description: 'Cria um novo usuário.',
      operationId: 'createUser',
      requestBody: {
        required: true,
        content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateUser' } } },
      },
      responses: {
        '201': {
          description: 'Created',
          headers: {
            Location: {
              description: 'URL do recurso criado',
              schema: { type: 'string', format: 'uri' },
            },
          },
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/User' },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '409': { $ref: '#/components/responses/Conflict' },
      },
    },
    get: {
      tags: ['Users'],
      summary: 'List users',
      description: 'Lista usuários com paginação.',
      operationId: 'listUsers',
      security: [{ bearerAuth: [] }],
      parameters: [
        { $ref: '#/components/parameters/PageParam' },
        { $ref: '#/components/parameters/PerPageParam' },
        { $ref: '#/components/parameters/NameParam' },
        { $ref: '#/components/parameters/EmailParam' },
        { $ref: '#/components/parameters/OrderByParam' },
        { $ref: '#/components/parameters/OrderDirectionParam' },
      ],
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PaginatedUsers' },
            },
          },
        },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
      },
    },
  },
  '/users/{id}': {
    get: {
      tags: ['Users'],
      summary: 'Get user by id',
      description: 'Retorna um usuário pelo id.',
      operationId: 'getUserById',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' },
          description: 'ID do usuário',
        },
      ],
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } },
        },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
        '404': { $ref: '#/components/responses/NotFound' },
      },
    },
    put: {
      tags: ['Users'],
      summary: 'Update user',
      description:
        'Atualiza integralmente os dados do usuário. Use PATCH para atualização parcial.',
      operationId: 'updateUser',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' },
          description: 'ID do usuário',
        },
      ],
      requestBody: {
        required: true,
        content: { 'application/json': { schema: { $ref: '#/components/schemas/UpdateUser' } } },
      },
      responses: {
        '200': {
          description: 'Updated',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } },
        },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
        '404': { $ref: '#/components/responses/NotFound' },
      },
    },
    delete: {
      tags: ['Users'],
      summary: 'Delete user',
      description: 'Remove um usuário pelo id.',
      operationId: 'deleteUser',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' },
          description: 'ID do usuário',
        },
      ],
      responses: {
        '204': { description: 'Deleted' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
        '404': { $ref: '#/components/responses/NotFound' },
      },
    },
  },
};

export { userPaths };
