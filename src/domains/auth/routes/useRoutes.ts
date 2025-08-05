import { IncomingMessage, ServerResponse } from 'http';
import { Router } from '../../../main/router/Router';
import { authenticateUserController } from '../useCases/authenticateUser';

function registerAuthRoutes(router: Router): void {
  router.register({
    method: 'POST',
    path: '/auth',
    handler: (req: IncomingMessage, res: ServerResponse) =>
      authenticateUserController.handle(req, res),
  });
}

export { registerAuthRoutes };
