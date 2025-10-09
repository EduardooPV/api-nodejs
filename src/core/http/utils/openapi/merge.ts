import type { OpenAPIV3_1 } from 'openapi-types';

class OpenApiPathMerger {
  static merge(
    target: OpenAPIV3_1.PathsObject,
    ...sources: OpenAPIV3_1.PathsObject[]
  ): OpenAPIV3_1.PathsObject {
    const output: OpenAPIV3_1.PathsObject = { ...target };

    for (const source of sources) {
      for (const [path, item] of Object.entries(source)) {
        output[path] = { ...(output[path] ?? {}), ...(item ?? {}) };
      }
    }

    return output;
  }
}

export { OpenApiPathMerger };
