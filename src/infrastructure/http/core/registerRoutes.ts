import { registerAuthRoutes } from '../routes/auth';
import { registerDocsRoutes } from '../routes/docs';
import { registerMetricsRoutes } from '../routes/metrics';
import { registerUserRoutes } from '../routes/user';
import { Router } from './Router';

function registerRoutes(router: Router): void {
  registerUserRoutes(router);
  registerAuthRoutes(router);
  registerDocsRoutes(router);
  registerMetricsRoutes(router);
}

export { registerRoutes };
