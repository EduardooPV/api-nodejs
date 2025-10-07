import { IncomingMessage, ServerResponse } from 'http';
import { PostgresShoppingListRespository } from '../database/PostgresShoppingListRepository';
import { CreateListUseCase } from 'modules/shopping/application/createList/CreateListUseCase';
import { CreateListController } from './controllers/CreateListController';
import { Router } from 'core/http/Router';
import { ensureAuthenticated } from 'modules/auth/infrastructure/http/middlewares/ensureAuthenticatedMiddleware';

const shoppingListRepository = new PostgresShoppingListRespository();

const createListUseCase = new CreateListUseCase(shoppingListRepository);
const createListController = new CreateListController(createListUseCase);

function registerShoppingListRoutes(router: Router): void {
  router.register({
    method: 'POST',
    path: '/lists',
    middlewares: [ensureAuthenticated],
    handler: (req: IncomingMessage, res: ServerResponse) => createListController.handle(req, res),
  });
}

export { registerShoppingListRoutes };
