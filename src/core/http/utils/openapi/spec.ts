import type { OpenAPIV3_1 } from 'openapi-types';
import { baseDoc } from './base';
import { OpenApiPathMerger } from './merge';

class OpenApiSpecBuilder {
  private static cached: OpenAPIV3_1.Document | null = null;

  static async build(): Promise<OpenAPIV3_1.Document> {
    if (this.cached) return this.cached;

    this.cached = {
      ...baseDoc,
      paths: OpenApiPathMerger.merge(baseDoc.paths ?? {}),
    };

    return this.cached;
  }

  static clearCache(): void {
    this.cached = null;
  }
}

export { OpenApiSpecBuilder };
