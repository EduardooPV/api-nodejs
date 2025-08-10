import type { OpenAPIV3_1 } from 'openapi-types';
import { baseDoc } from './base';
import { mergePaths } from './merge';
import { userPaths } from '../routes/user/openapi';
import { authPaths } from '../routes/auth/openapi';

let cached: OpenAPIV3_1.Document | null = null;

async function getOpenApiSpec(): Promise<OpenAPIV3_1.Document> {
  if (cached) return cached;

  cached = {
    ...baseDoc,
    paths: mergePaths(baseDoc.paths ?? {}, userPaths, authPaths),
  };

  return cached;
}

export { getOpenApiSpec };
