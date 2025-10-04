import { DocsController } from '@infrastructure/http/controllers/docs/DocsController';
import { OpenApiController } from '@infrastructure/http/controllers/docs/OpenApiController';
import { Router } from '@infrastructure/http/core/Router';

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
