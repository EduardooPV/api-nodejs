import type { OpenAPIV3_1 } from 'openapi-types';

const baseDoc: OpenAPIV3_1.Document = {
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
      User: {
        type: 'object',
        required: ['id', 'name', 'email', 'createdAt'],
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
        },
      },
      CreateUser: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 8 },
        },
      },
      UpdateUser: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 8 },
        },
        additionalProperties: false,
      },
      PaginatedUsers: {
        type: 'object',
        required: ['items', 'pagination'],
        properties: {
          items: { type: 'array', items: { $ref: '#/components/schemas/User' } },
          pagination: {
            type: 'object',
            properties: {
              total: { type: 'integer' },
              page: { type: 'integer' },
              perPage: { type: 'integer' },
              totalPages: { type: 'integer' },
              hasNextPage: { type: 'boolean' },
              hasPreviousPage: { type: 'boolean' },
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
      NameParam: {
        name: 'name',
        in: 'query',
        required: false,
        description: 'Filtro por nome (contains, case-insensitive).',
        schema: { type: 'string', minLength: 1 },
      },
      EmailParam: {
        name: 'email',
        in: 'query',
        required: false,
        description: 'Filtro por email (contains, case-insensitive).',
        schema: { type: 'string', minLength: 3 },
      },
      OrderByParam: {
        name: 'orderBy',
        in: 'query',
        required: false,
        description: 'Campo para ordenação.',
        schema: { type: 'string', enum: ['name', 'email', 'createdAt'], default: 'createdAt' },
      },
      OrderDirectionParam: {
        name: 'orderDirection',
        in: 'query',
        required: false,
        description: 'Direção da ordenação.',
        schema: { type: 'string', enum: ['asc', 'desc'], default: 'asc' },
      },
    },
  },
  paths: {},
};

export { baseDoc };
