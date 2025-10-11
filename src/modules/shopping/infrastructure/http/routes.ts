import { IncomingMessage, ServerResponse } from 'http';
import { PostgresShoppingListRespository } from 'modules/shopping/infrastructure/database/postgres-shopping-list-repository';
import { CreateListUseCase } from 'modules/shopping/application/create-list/create-list-use-case';
import { CreateListController } from './controllers/create-list-controller';
import { Router } from 'core/http/router';
import { EnsureAuthenticatedMiddleware } from 'modules/auth/infrastructure/http/middlewares/ensure-authenticated';
import { GetListUseCase } from 'modules/shopping/application/get-list/get-list-use-case';
import { GetListController } from './controllers/get-list.controller';

class ShoppingRoutes {
  private static shoppingListRepository = new PostgresShoppingListRespository();

  private static createListUseCase = new CreateListUseCase(ShoppingRoutes.shoppingListRepository);
  private static createListController = new CreateListController(ShoppingRoutes.createListUseCase);
  private static getListUsecase = new GetListUseCase(ShoppingRoutes.shoppingListRepository);
  private static getListController = new GetListController(ShoppingRoutes.getListUsecase);

  static register(router: Router): void {
    router.register({
      method: 'POST',
      path: '/lists',
      middlewares: [EnsureAuthenticatedMiddleware.handle],
      handler: (req: IncomingMessage, res: ServerResponse) =>
        ShoppingRoutes.createListController.handle(req, res),
    });
    router.register({
      method: 'GET',
      path: '/lists/:listId',
      middlewares: [EnsureAuthenticatedMiddleware.handle],
      handler: (req: IncomingMessage, res: ServerResponse) =>
        ShoppingRoutes.getListController.handle(req, res),
    });
  }
}

export { ShoppingRoutes };
