import { IncomingMessage, ServerResponse } from 'http';
import { PostgresShoppingListRespository } from '../database/postgres-shopping-list-repository';
import { CreateListUseCase } from 'modules/shopping/application/create-list/create-list-use-case';
import { CreateListController } from './controllers/create-list-controller';
import { Router } from 'core/http/router';
import { EnsureAuthenticatedMiddleware } from 'modules/auth/infrastructure/http/middlewares/ensure-authenticated';

const shoppingListRepository = new PostgresShoppingListRespository();

const createListUseCase = new CreateListUseCase(shoppingListRepository);
const createListController = new CreateListController(createListUseCase);

function registerShoppingListRoutes(router: Router): void {
  router.register({
    method: 'POST',
    path: '/lists',
    middlewares: [EnsureAuthenticatedMiddleware.handle],
    handler: (req: IncomingMessage, res: ServerResponse) => createListController.handle(req, res),
  });
}

export { registerShoppingListRoutes };
