import { DocsController } from 'core/http/controllers/docs/docs-controller';
import { OpenApiController } from 'core/http/controllers/docs/openapi-controller';
import { Router } from 'core/http/router';

const openApiController = new OpenApiController();
const docsController = new DocsController();

function registerDocsRoutes(router: Router): void {
  router.register({
    path: '/openapi.json',
    method: 'GET',
    handler: (req, res) => openApiController.handle(req, res),
  });
  router.register({
    path: '/docs',
    method: 'GET',
    handler: (req, res) => docsController.handle(req, res),
  });
}

export { registerDocsRoutes };
