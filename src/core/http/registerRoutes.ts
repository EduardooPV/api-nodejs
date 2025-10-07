import { registerAuthRoutes } from 'modules/auth/infrastructure/routes';
import { registerDocsRoutes } from 'core/http/routes/docs';
import { registerMetricsRoutes } from 'core/http/routes/metrics';
import { registerUserRoutes } from 'modules/users/infrastructure/http/routes';
import { Router } from './Router';

function registerRoutes(router: Router): void {
  registerUserRoutes(router);
  registerAuthRoutes(router);
  registerDocsRoutes(router);
  registerMetricsRoutes(router);
}

export { registerRoutes };
