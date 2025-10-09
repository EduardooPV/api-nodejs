import { GetMetricsController } from 'core/http/controllers/metrics/get-metrics';
import { Router } from 'core/http/router';

const getMetricsController = new GetMetricsController();

function registerMetricsRoutes(router: Router): void {
  router.register({
    method: 'GET',
    path: '/metrics',
    handler: getMetricsController.handle,
  });
}

export { registerMetricsRoutes };
