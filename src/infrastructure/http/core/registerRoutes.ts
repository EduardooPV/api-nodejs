import { registerAuthRoutes } from '../routes/auth';
import { registerUserRoutes } from '../routes/user';
import { Router } from './Router';

export function registerRoutes(router: Router): void {
  registerUserRoutes(router);
  registerAuthRoutes(router);
}
