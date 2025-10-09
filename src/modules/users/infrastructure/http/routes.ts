import { IncomingMessage, ServerResponse } from 'http';

import { PostgresUsersRepository } from 'modules/users/infrastructure/database/postgres-users-repository';

import { CreateUserUseCase } from 'modules/users/application/create-user/create-user-use-case';
import { DeleteUserUseCase } from 'modules/users/application/delete-user/delete-user-use-case';
import { ListUsersUseCase } from 'modules/users/application/list-users/list-users-use-case';
import { GetUserUseCase } from 'modules/users/application/get-user/get-user-use-case';
import { UpdateUserUseCase } from 'modules/users/application/update-user/update-user-use-case';

import { CreateUserController } from 'modules/users/infrastructure/http/controllers/create-user-controller';
import { DeleteUserController } from 'modules/users/infrastructure/http/controllers/delete-user-controller';
import { GetUserController } from 'modules/users/infrastructure/http/controllers/get-user-controller';
import { ListUsersController } from 'modules/users/infrastructure/http/controllers/list-users-controller';
import { UpdateUserController } from 'modules/users/infrastructure/http/controllers/update-user-controller';
import { ensureAuthenticated } from 'modules/auth/infrastructure/http/middlewares/ensure-authenticated';
import { GetCurrentUserController } from 'modules/users/infrastructure/http/controllers/get-current-user-controller';
import { Router } from 'core/http/router';

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
    path: '/users',
    middlewares: [ensureAuthenticated],
    handler: (req: IncomingMessage, res: ServerResponse) =>
      deleteUserByIdController.handle(req, res),
  });

  router.register({
    method: 'PUT',
    path: '/users',
    middlewares: [ensureAuthenticated],
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
