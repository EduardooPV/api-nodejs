import { IncomingMessage, ServerResponse } from 'http';
import { PostgresUsersRepository } from 'modules/users/infrastructure/database/postgres-users-repository';
import { LoginUserUseCase } from 'modules/auth/application/login-user/login-user-use-case';

import { LoginUserController } from 'modules/auth/infrastructure/http/controllers/login-user-controller';
import { RefreshTokenController } from 'modules/auth/infrastructure/http/controllers/refresh-token-controller';
import { RefreshTokenUseCase } from 'modules/auth/application/refresh-token/refresh-token-use-case';
import { LogoutUserController } from 'modules/auth/infrastructure/http/controllers/logout-user-controller';
import { LogoutUserUseCase } from 'modules/auth/application/logout-user/logout-user-use-case';
import { Router } from 'core/http/router';

class AuthRoutes {
  private static usersRepository = new PostgresUsersRepository();

  private static loginUserController = new LoginUserController(
    new LoginUserUseCase(AuthRoutes.usersRepository),
  );
  private static refreshTokenController = new RefreshTokenController(
    new RefreshTokenUseCase(AuthRoutes.usersRepository),
  );
  private static logoutUserController = new LogoutUserController(
    new LogoutUserUseCase(AuthRoutes.usersRepository),
  );

  static register(router: Router): void {
    router.register({
      method: 'POST',
      path: '/auth/login',
      handler: (req: IncomingMessage, res: ServerResponse) =>
        AuthRoutes.loginUserController.handle(req, res),
    });

    router.register({
      method: 'POST',
      path: '/auth/refresh',
      handler: (req: IncomingMessage, res: ServerResponse) =>
        AuthRoutes.refreshTokenController.handle(req, res),
    });

    router.register({
      method: 'POST',
      path: '/auth/logout',
      handler: (req: IncomingMessage, res: ServerResponse) =>
        AuthRoutes.logoutUserController.handle(req, res),
    });
  }
}

export { AuthRoutes };
