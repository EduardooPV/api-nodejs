import { IncomingMessage, ServerResponse } from 'http';
import { PostgresShoppingListRespository } from '../database/postgres-shopping-list-repository';
import { CreateListUseCase } from 'modules/shopping/application/create-list/create-list-use-case';
import { CreateListController } from './controllers/create-list-controller';
import { Router } from 'core/http/router';
import { EnsureAuthenticatedMiddleware } from 'modules/auth/infrastructure/http/middlewares/ensure-authenticated';

class ShoppingRoutes {
  private static shoppingListRepository = new PostgresShoppingListRespository();

  private static createListUseCase = new CreateListUseCase(ShoppingRoutes.shoppingListRepository);
  private static createListController = new CreateListController(ShoppingRoutes.createListUseCase);

  static register(router: Router): void {
    router.register({
      method: 'POST',
      path: '/lists',
      middlewares: [EnsureAuthenticatedMiddleware.handle],
      handler: (req: IncomingMessage, res: ServerResponse) =>
        ShoppingRoutes.createListController.handle(req, res),
    });
  }
}

export { ShoppingRoutes };
