import { getMetrics } from 'core/http/controllers/metrics/getMetrics';
import { Router } from 'core/http/Router';

function registerMetricsRoutes(router: Router): void {
  router.register({
    method: 'GET',
    path: '/metrics',
    handler: getMetrics,
  });
}

export { registerMetricsRoutes };
