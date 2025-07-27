import { createUserController } from '../../domains/users/useCases/CreateUser';
import { listUsersController } from '../../domains/users/useCases/ListUsers';
import { Router } from './Router';

export function registerRoutes(router: Router): void {
  router.register({
    method: 'GET',
    path: '/users',
    handler: (req, res) => listUsersController.handle(req, res),
  });

  router.register({
    method: 'POST',
    path: '/users',
    handler: (req, res) => {
      void createUserController.handle(req, res);
    },
  });
}
