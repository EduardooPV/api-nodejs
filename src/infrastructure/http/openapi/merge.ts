import type { OpenAPIV3_1 } from 'openapi-types';

function mergePaths(
  target: OpenAPIV3_1.PathsObject,
  source: OpenAPIV3_1.PathsObject,
): OpenAPIV3_1.PathsObject {
  const out: OpenAPIV3_1.PathsObject = { ...target };
  for (const [path, item] of Object.entries(source)) {
    out[path] = { ...(out[path] ?? {}), ...(item ?? {}) };
  }
  return out;
}

export { mergePaths };
