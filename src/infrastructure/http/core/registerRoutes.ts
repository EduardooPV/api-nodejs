import { registerAuthRoutes } from './auth/useRoutes';
import { registerUserRoutes } from './user/useRoutes';
import { Router } from '../Router';

export function registerRoutes(router: Router): void {
  registerUserRoutes(router);
  registerAuthRoutes(router);
}
