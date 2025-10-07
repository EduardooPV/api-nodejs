import type { OpenAPIV3_1 } from 'openapi-types';

function mergePaths(
  target: OpenAPIV3_1.PathsObject,
  ...sources: OpenAPIV3_1.PathsObject[]
): OpenAPIV3_1.PathsObject {
  const out: OpenAPIV3_1.PathsObject = { ...target };
  for (const src of sources) {
    for (const [p, item] of Object.entries(src)) {
      out[p] = { ...(out[p] ?? {}), ...(item ?? {}) };
    }
  }
  return out;
}

export { mergePaths };
