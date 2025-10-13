import type { OpenAPI } from 'shared/types/openapi';
import { baseDoc } from './base';
import { OpenApiPathMerger } from './merge';

import { createUserDocs } from 'modules/users/infrastructure/http/docs/create-user-docs';
import { deleteUserDocs } from 'modules/users/infrastructure/http/docs/delete-user-docs';
import { getUserDocs } from 'modules/users/infrastructure/http/docs/get-user-docs';
import { updateUserDocs } from 'modules/users/infrastructure/http/docs/update-user-docs';

const allDocsModules = [createUserDocs, deleteUserDocs, getUserDocs, updateUserDocs];

class OpenApiSpecBuilder {
  private static cached: OpenAPI.Document | null = null;

  static async build(): Promise<OpenAPI.Document> {
    if (this.cached) return this.cached;

    const mergedPaths = OpenApiPathMerger.merge(baseDoc.paths ?? {}, ...allDocsModules);

    this.cached = {
      ...baseDoc,
      paths: mergedPaths,
    };

    return this.cached;
  }

  static clearCache(): void {
    this.cached = null;
  }
}

export { OpenApiSpecBuilder };
