import { IncomingMessage, ServerResponse } from 'http';
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticatedMiddleware';

import { PostgresUsersRepository } from '../../../database/repositories/PostgresUsersRepository';

import { CreateUserUseCase } from '../../../../application/useCases/createUser/CreateUserUseCase';
import { DeleteUserUseCase } from '../../../../application/useCases/deleteUser/DeleteUserUseCase';
import { GetUserUseCase } from '../../../../application/useCases/getUser/GetUserUseCase';
import { ListUsersUseCase } from '../../../../application/useCases/listUsers/ListUsersUseCase';
import { UpdateUserUseCase } from '../../../../application/useCases/updateUser/UpdateUserUseCase';

import { CreateUserController } from '../../controllers/user/CreateUserController';
import { DeleteUserController } from '../../controllers/user/DeleteUserController';
import { GetUserController } from '../../controllers/user/GetUserController';
import { ListUsersController } from '../../controllers/user/ListUsersController';
import { UpdateUserController } from '../../controllers/user/UpdateUserController';
import { Router } from '../../core/Router';

const usersRepository = new PostgresUsersRepository();

const listUsersController = new ListUsersController(new ListUsersUseCase(usersRepository));
const getUserController = new GetUserController(new GetUserUseCase(usersRepository));
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
    handler: (req: IncomingMessage, res: ServerResponse) => {
      ensureAuthenticated(req, res, () => getUserController.handle(req, res));
    },
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

export { registerUserRoutes };
