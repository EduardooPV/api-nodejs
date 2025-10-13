import type { OpenAPI } from 'shared/types/openapi';

const baseDoc: OpenAPI.Document = {
  openapi: '3.0.3',
  info: { title: 'API - Dudu', version: '1.0.0' },
  servers: [{ url: 'http://localhost:3333' }],
  tags: [{ name: 'Auth' }, { name: 'Users' }],
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    },
    schemas: {
      ErrorResponse: {
        type: 'object',
        required: ['error'],
        properties: {
          error: {
            type: 'object',
            required: ['code', 'message'],
            properties: {
              code: { type: 'string' },
              message: { type: 'string' },
              details: {},
            },
          },
        },
      },
    },
    responses: {
      BadRequest: {
        description: 'Bad Request',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
      },
      Unauthorized: {
        description: 'Unauthorized',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
      },
      Forbidden: {
        description: 'Forbidden',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
      },
      NotFound: {
        description: 'Not Found',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
      },
      Conflict: {
        description: 'Conflict',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
      },
      InternalError: {
        description: 'Internal Server Error',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
      },
    },
    parameters: {
      PageParam: {
        name: 'page',
        in: 'query',
        required: false,
        description: 'Página (>= 1).',
        schema: { type: 'integer', minimum: 1, default: 1 },
      },
      PerPageParam: {
        name: 'perPage',
        in: 'query',
        required: false,
        description: 'Itens por página (1..50).',
        schema: { type: 'integer', minimum: 1, maximum: 50, default: 10 },
      },
    },
  },
  paths: {},
};

export { baseDoc };
