import { IncomingMessage, ServerResponse } from 'http';
import { Router } from '../../../main/router/Router';
import { createUserController } from '../useCases/createUser';
import { listUsersController } from '../useCases/listUsers';
import { getUserController } from '../useCases/getUser';
import { deleteUserByIdController } from '../useCases/deleteUser';
import { updateUserController } from '../useCases/updateUser';

export function registerUserRoutes(router: Router): void {
  router.register({
    method: 'GET',
    path: '/users',
    handler: (req: IncomingMessage, res: ServerResponse) => listUsersController.handle(req, res),
  });

  router.register({
    method: 'GET',
    path: '/users/:id',
    handler: (req: IncomingMessage, res: ServerResponse) => getUserController.handle(req, res),
  });

  router.register({
    method: 'POST',
    path: '/users',
    handler: (req: IncomingMessage, res: ServerResponse) => createUserController.handle(req, res),
  });

  router.register({
    method: 'DELETE',
    path: '/users/:id',
    handler: (req: IncomingMessage, res: ServerResponse) =>
      deleteUserByIdController.handle(req, res),
  });

  router.register({
    method: 'PUT',
    path: '/users/:id',
    handler: (req: IncomingMessage, res: ServerResponse) => updateUserController.handle(req, res),
  });
}
