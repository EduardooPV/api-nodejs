import { getMetrics } from '../../controllers/metrics/getMetrics';
import { Router } from '../../core/Router';

function registerMetricsRoutes(router: Router): void {
  router.register({
    method: 'GET',
    path: '/metrics',
    handler: getMetrics,
  });
}

export { registerMetricsRoutes };
