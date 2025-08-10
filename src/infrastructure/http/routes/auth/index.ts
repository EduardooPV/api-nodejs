import { IncomingMessage, ServerResponse } from 'http';
import { PostgresUsersRepository } from '../../../database/repositories/PostgresUsersRepository';
import { LoginUserUseCase } from '../../../../application/useCases/auth/loginUser/LoginUserUseCase';
import { Router } from '../../core/Router';
import { LoginUserController } from '../../controllers/auth/LoginUserController';
import { RefreshTokenController } from '../../controllers/auth/RefreshTokenController';
import { RefreshTokenUseCase } from '../../../../application/useCases/auth/refreshToken/RefreshTokenUseCase';
import { LogoutUserController } from '../../controllers/auth/LogoutUserController';
import { LogoutUserUseCase } from '../../../../application/useCases/auth/logoutUser/LogoutUserUseCase';

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
