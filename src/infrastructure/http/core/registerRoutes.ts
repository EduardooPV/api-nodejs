import { registerAuthRoutes } from '../routes/auth';
import { registerUserRoutes } from '../routes/user';
import { Router } from './Router';

function registerRoutes(router: Router): void {
  registerUserRoutes(router);
  registerAuthRoutes(router);
}

export { registerRoutes };
