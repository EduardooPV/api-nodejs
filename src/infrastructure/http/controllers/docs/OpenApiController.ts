import { IncomingMessage, ServerResponse } from 'http';
import { getOpenApiSpec } from '../../openapi/spec';
import { reply } from '../../utils/reply';

class OpenApiController {
  async handle(_req: IncomingMessage, res: ServerResponse): Promise<void> {
    const spec = await getOpenApiSpec();
    reply(res).ok(spec);
  }
}

export { OpenApiController };
