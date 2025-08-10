// base.ts
import type { OpenAPIV3_1 } from 'openapi-types';

export const baseDoc: OpenAPIV3_1.Document = {
  openapi: '3.0.3',
  info: { title: 'API - Dudu', version: '1.0.0' },
  servers: [{ url: 'http://localhost:3333' }],
  tags: [{ name: 'System' }, { name: 'Auth' }, { name: 'Users' }],
  components: {
    securitySchemes: {
      /* ... */
    },
    schemas: {
      /* ... */
    },
  },
  paths: {
    '/health': {
      get: {
        tags: ['System'],
        summary: 'Health check',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': { schema: { type: 'string' }, examples: { ok: { value: 'OK' } } },
            },
          },
        },
      },
    },
  },
};
