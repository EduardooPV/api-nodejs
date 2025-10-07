import { IncomingMessage, ServerResponse } from 'http';
import { PostgresUsersRepository } from 'modules/users/infrastructure/database/PostgresUsersRepository';
import { LoginUserUseCase } from 'modules/auth/application/loginUser/LoginUserUseCase';

import { LoginUserController } from 'modules/auth/infrastructure/http/controllers/LoginUserController';
import { RefreshTokenController } from 'modules/auth/infrastructure/http/controllers/RefreshTokenController';
import { RefreshTokenUseCase } from 'modules/auth/application/refreshToken/RefreshTokenUseCase';
import { LogoutUserController } from 'modules/auth/infrastructure/http/controllers/LogoutUserController';
import { LogoutUserUseCase } from 'modules/auth/application/logoutUser/LogoutUserUseCase';
import { Router } from 'core/http/Router';

function registerAuthRoutes(router: Router): void {
  const usersRepository = new PostgresUsersRepository();

  const loginUserController = new LoginUserController(new LoginUserUseCase(usersRepository));

  const refreshTokenController = new RefreshTokenController(
    new RefreshTokenUseCase(usersRepository),
  );

  const logoutUserController = new LogoutUserController(new LogoutUserUseCase(usersRepository));

  router.register({
    method: 'POST',
    path: '/auth/login',
    handler: (req: IncomingMessage, res: ServerResponse) => loginUserController.handle(req, res),
  });

  router.register({
    method: 'POST',
    path: '/auth/refresh',
    handler: (req: IncomingMessage, res: ServerResponse) => refreshTokenController.handle(req, res),
  });

  router.register({
    method: 'POST',
    path: '/auth/logout',
    handler: (req: IncomingMessage, res: ServerResponse) => logoutUserController.handle(req, res),
  });
}

export { registerAuthRoutes };
