import { IncomingMessage, ServerResponse } from 'http';
import { Router } from '../../../main/router/Router';
import { createUserController } from '../useCases/CreateUser';
import { listUsersController } from '../useCases/ListUsers';
import { findUserByIdController } from '../useCases/FindUserById';

export function registerUserRoutes(router: Router): void {
  router.register({
    method: 'GET',
    path: '/users',
    handler: (req: IncomingMessage, res: ServerResponse) => listUsersController.handle(req, res),
  });

  router.register({
    method: 'GET',
    path: '/users/:id',
    handler: (req: IncomingMessage, res: ServerResponse) => findUserByIdController.handle(req, res),
  });

  router.register({
    method: 'POST',
    path: '/users',
    handler: (req: IncomingMessage, res: ServerResponse) =>
      void createUserController.handle(req, res),
  });
}
