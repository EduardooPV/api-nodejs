import { IncomingMessage, ServerResponse } from 'http';
import { PostgresUsersRepository } from '../../../database/repositories/PostgresUsersRepository';
import { AuthenticateUserUseCase } from '../../../../application/useCases/authenticateUser/AuthenticateUserUseCase';
import { Router } from '../../core/Router';
import { AuthenticateUserController } from '../../controllers/auth/AuthenticateUserController';

function registerAuthRoutes(router: Router): void {
  const usersRepository = new PostgresUsersRepository();

  const authenticateUserController = new AuthenticateUserController(
    new AuthenticateUserUseCase(usersRepository),
  );

  router.register({
    method: 'POST',
    path: '/auth',
    handler: (req: IncomingMessage, res: ServerResponse) =>
      authenticateUserController.handle(req, res),
  });
}

export { registerAuthRoutes };
