import { registerAuthRoutes } from '@infrastructure/http/routes/auth';
import { registerDocsRoutes } from '@infrastructure/http/routes/docs';
import { registerMetricsRoutes } from '@infrastructure/http/routes/metrics';
import { registerUserRoutes } from '@infrastructure/http/routes/user';
import { Router } from './Router';

function registerRoutes(router: Router): void {
  registerUserRoutes(router);
  registerAuthRoutes(router);
  registerDocsRoutes(router);
  registerMetricsRoutes(router);
}

export { registerRoutes };
