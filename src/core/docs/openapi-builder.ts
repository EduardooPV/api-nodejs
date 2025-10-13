import type { OpenAPI } from 'shared/types/openapi';

export class OpenApiRouteBuilder {
  static build({
    path,
    method,
    tags,
    summary,
    requestBody,
    responses,
  }: {
    path: string;
    method: 'get' | 'post' | 'put' | 'delete';
    tags: string[];
    summary: string;
    requestBody?: OpenAPI.RequestBodyObject;
    responses: OpenAPI.ResponsesObject;
  }): OpenAPI.PathsObject {
    const route: OpenAPI.PathsObject = {
      [path]: {
        [method]: {
          tags,
          summary,
          requestBody,
          responses,
        },
      },
    };
    return route;
  }
}
