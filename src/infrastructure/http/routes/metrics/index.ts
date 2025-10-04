import { getMetrics } from '@infrastructure/http/controllers/metrics/getMetrics';
import { Router } from '@infrastructure/http/core/Router';

function registerMetricsRoutes(router: Router): void {
  router.register({
    method: 'GET',
    path: '/metrics',
    handler: getMetrics,
  });
}

export { registerMetricsRoutes };
