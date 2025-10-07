import { IncomingMessage, ServerResponse } from 'http';
import { getOpenApiSpec } from 'core/http/utils/openapi/spec';
import { reply } from 'core/http/utils/reply';

class OpenApiController {
  async handle(_req: IncomingMessage, res: ServerResponse): Promise<void> {
    const spec = await getOpenApiSpec();
    reply(res).ok(spec);
  }
}

export { OpenApiController };
