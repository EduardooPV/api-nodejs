import { IncomingMessage, ServerResponse } from 'http';

import { PostgresUsersRepository } from 'modules/users/infrastructure/database/PostgresUsersRepository';

import { CreateUserUseCase } from 'modules/users/application/createUser/CreateUserUseCase';
import { DeleteUserUseCase } from 'modules/users/application/deleteUser/DeleteUserUseCase';
import { ListUsersUseCase } from 'modules/users/application/listUsers/ListUsersUseCase';
import { GetUserUseCase } from 'modules/users/application/getUser/GetUserUseCase';
import { UpdateUserUseCase } from 'modules/users/application/updateUser/UpdateUserUseCase';

import { CreateUserController } from 'modules/users/infrastructure/http/controllers/CreateUserController';
import { DeleteUserController } from 'modules/users/infrastructure/http/controllers/DeleteUserController';
import { GetUserController } from 'modules/users/infrastructure/http/controllers/GetUserController';
import { ListUsersController } from 'modules/users/infrastructure/http/controllers/ListUsersController';
import { UpdateUserController } from 'modules/users/infrastructure/http/controllers/UpdateUserController';
import { ensureAuthenticated } from 'modules/auth/infrastructure/http/middlewares/ensureAuthenticatedMiddleware';
import { GetCurrentUserController } from 'modules/users/infrastructure/http/controllers/GetCurrentUserController';
import { Router } from 'core/http/Router';

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
