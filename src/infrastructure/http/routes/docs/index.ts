import { DocsController } from '../../controllers/docs/DocsController';
import { OpenApiController } from '../../controllers/docs/OpenApiController';
import { Router } from '../../core/Router';

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
