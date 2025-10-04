import { IncomingMessage, ServerResponse } from 'http';
import { getOpenApiSpec } from '@infrastructure/http/openapi/spec';
import { reply } from '@infrastructure/http/utils/reply';

class OpenApiController {
  async handle(_req: IncomingMessage, res: ServerResponse): Promise<void> {
    const spec = await getOpenApiSpec();
    reply(res).ok(spec);
  }
}

export { OpenApiController };
