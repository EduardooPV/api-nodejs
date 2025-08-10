import type { OpenAPIV3_1 } from 'openapi-types';

export const authPaths: OpenAPIV3_1.PathsObject = {
  '/auth/login': {
    post: {
      tags: ['Auth'],
      summary: 'Login',
      description:
        'Autentica o usuário. Define um cookie **HttpOnly** `refreshToken` e retorna um `accessToken` no corpo.',
      operationId: 'login',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'password'],
              properties: {
                email: { type: 'string', format: 'email' },
                password: { type: 'string', minLength: 8 },
              },
            },
            examples: {
              default: {
                value: { email: 'ana@example.com', password: 'secr3tpass' },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Authenticated',
          headers: {
            'Set-Cookie': {
              description:
                'Cookie **HttpOnly** com o `refreshToken`. Ex.: `refreshToken=...; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800` (e `Secure` em produção).',
              schema: { type: 'string' },
            },
          },
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['message', 'accessToken'],
                properties: {
                  message: { type: 'string' },
                  accessToken: { type: 'string' },
                },
              },
              examples: {
                default: {
                  value: {
                    message: 'User authenticated successfully',
                    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                  },
                },
              },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
      },
    },
  },

  '/auth/refresh': {
    post: {
      tags: ['Auth'],
      summary: 'Refresh tokens',
      description: 'Gera novo `accessToken` e rotaciona o `refreshToken` no cookie **HttpOnly**.',
      operationId: 'refresh',

      parameters: [
        {
          in: 'cookie',
          name: 'refreshToken',
          required: true,
          description: 'Refresh token atual do usuário (HttpOnly cookie).',
          schema: { type: 'string' },
        },
      ],
      responses: {
        '200': {
          description: 'OK',
          headers: {
            'Set-Cookie': {
              description: 'Novo cookie **HttpOnly** `refreshToken` (token rotacionado).',
              schema: { type: 'string' },
            },
          },
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['message', 'accessToken'],
                properties: {
                  message: { type: 'string' },
                  accessToken: { type: 'string' },
                },
              },
              examples: {
                default: {
                  value: {
                    message: 'Token refreshed successfully',
                    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                  },
                },
              },
            },
          },
        },
        '401': { $ref: '#/components/responses/Unauthorized' },
      },
    },
  },

  '/auth/logout': {
    post: {
      tags: ['Auth'],
      summary: 'Logout',
      description: 'Revoga o refresh token atual e limpa o cookie **HttpOnly** no cliente.',
      operationId: 'logout',
      parameters: [
        {
          in: 'cookie',
          name: 'refreshToken',
          required: true,
          description: 'Refresh token atual (HttpOnly cookie).',
          schema: { type: 'string' },
        },
      ],
      responses: {
        '204': {
          description: 'No Content',
          headers: {
            'Set-Cookie': {
              description:
                'Cookie `refreshToken` limpo. Ex.: `refreshToken=; Path=/; HttpOnly; Max-Age=0`.',
              schema: { type: 'string' },
            },
          },
        },
        '401': { $ref: '#/components/responses/Unauthorized' },
      },
    },
  },
};
