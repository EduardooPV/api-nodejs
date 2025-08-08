import { IncomingMessage, ServerResponse } from 'http';
import { PostgresUsersRepository } from '../../../database/repositories/PostgresUsersRepository';
import { AuthenticateUserUseCase } from '../../../../application/useCases/auth/authenticateUser/AuthenticateUserUseCase';
import { Router } from '../../core/Router';
import { AuthenticateUserController } from '../../controllers/auth/AuthenticateUserController';
import { RefreshTokenController } from '../../controllers/auth/RefreshTokenController';
import { RefreshTokenUseCase } from '../../../../application/useCases/auth/refreshToken/RefreshTokenUseCase';
import { LogoutUserController } from '../../controllers/auth/LogoutUserController';
import { LogoutUserUseCase } from '../../../../application/useCases/auth/logoutUser/LogoutUserUseCase';

function registerAuthRoutes(router: Router): void {
  const usersRepository = new PostgresUsersRepository();

  const authenticateUserController = new AuthenticateUserController(
    new AuthenticateUserUseCase(usersRepository),
  );

  const refreshTokenController = new RefreshTokenController(
    new RefreshTokenUseCase(usersRepository),
  );

  const logoutUserController = new LogoutUserController(new LogoutUserUseCase(usersRepository));

  router.register({
    method: 'POST',
    path: '/auth/login',
    handler: (req: IncomingMessage, res: ServerResponse) =>
      authenticateUserController.handle(req, res),
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
