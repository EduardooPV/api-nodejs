import { IncomingMessage, ServerResponse } from 'http';

import { PostgresUsersRepository } from '@infrastructure/database/repositories/PostgresUsersRepository';

import { CreateUserUseCase } from '@application/useCases/users/createUser/CreateUserUseCase';
import { DeleteUserUseCase } from '@application/useCases/users/deleteUser/DeleteUserUseCase';
import { ListUsersUseCase } from '@application/useCases/users/listUsers/ListUsersUseCase';
import { GetUserUseCase } from '@application/useCases/users/getUser/GetUserUseCase';
import { UpdateUserUseCase } from '@application/useCases/users/updateUser/UpdateUserUseCase';

import { CreateUserController } from '@infrastructure/http/controllers/user/CreateUserController';
import { DeleteUserController } from '@infrastructure/http/controllers/user/DeleteUserController';
import { GetUserController } from '@infrastructure/http/controllers/user/GetUserController';
import { ListUsersController } from '@infrastructure/http/controllers/user/ListUsersController';
import { UpdateUserController } from '@infrastructure/http/controllers/user/UpdateUserController';
import { ensureAuthenticated } from '@infrastructure/http/middlewares/ensureAuthenticatedMiddleware';
import { GetCurrentUserController } from '@infrastructure/http/controllers/user/GetCurrentUserController';
import { Router } from '@infrastructure/http/core/Router';

const usersRepository = new PostgresUsersRepository();

const listUsersController = new ListUsersController(new ListUsersUseCase(usersRepository));
const getUserUseCase = new GetUserUseCase(usersRepository);
const getUserController = new GetUserController(getUserUseCase);
const getCurrentUserController = new GetCurrentUserController(getUserUseCase);
const createUserController = new CreateUserController(new CreateUserUseCase(usersRepository));
const deleteUserByIdController = new DeleteUserController(new DeleteUserUseCase(usersRepository));
const updateUserController = new UpdateUserController(new UpdateUserUseCase(usersRepository));

function registerUserRoutes(router: Router): void {
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

  router.register({
    method: 'GET',
    path: '/users/me',
    middlewares: [ensureAuthenticated],
    handler: (req: IncomingMessage, res: ServerResponse) =>
      getCurrentUserController.handle(req, res),
  });
}

export { registerUserRoutes };
