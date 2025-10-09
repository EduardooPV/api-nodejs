import { IncomingMessage, ServerResponse } from 'http';
import { OpenApiSpecBuilder } from 'core/http/utils/openapi/spec';
import { reply } from 'core/http/utils/reply';

class OpenApiController {
  async handle(_req: IncomingMessage, res: ServerResponse): Promise<void> {
    const spec = await OpenApiSpecBuilder.build();
    reply(res).ok(spec);
  }
}

export { OpenApiController };
