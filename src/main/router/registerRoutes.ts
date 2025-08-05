import { registerAuthRoutes } from '../../domains/auth/routes/useRoutes';
import { registerUserRoutes } from '../../domains/users/routes/useRoutes';
import { Router } from './Router';

export function registerRoutes(router: Router): void {
  registerUserRoutes(router);
  registerAuthRoutes(router);
}
