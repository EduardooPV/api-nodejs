import type { OpenAPIV3_1 } from 'openapi-types';
import { baseDoc } from './base';

let cached: OpenAPIV3_1.Document | null = null;

async function getOpenApiSpec(): Promise<OpenAPIV3_1.Document> {
  if (cached) return cached;

  const doc: OpenAPIV3_1.Document = {
    ...baseDoc,
    paths: {},
  };

  cached = doc;
  return doc;
}

export { getOpenApiSpec };
