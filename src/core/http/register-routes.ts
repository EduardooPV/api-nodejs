import { Router } from './router';
import { registerAuthRoutes } from 'modules/auth/infrastructure/routes';
import { registerDocsRoutes } from 'core/http/routes/docs';
import { registerMetricsRoutes } from 'core/http/routes/metrics';
import { UserRoutes } from 'modules/users/infrastructure/http/routes';
import { registerShoppingListRoutes } from 'modules/shopping/infrastructure/http/routes';

class RouteRegister {
  constructor(private readonly router: Router) {}

  public registerAll(): void {
    this.registerUserRoutes();
    this.registerAuthRoutes();
    this.registerDocsRoutes();
    this.registerMetricsRoutes();
    this.registerShoppingListRoutes();
  }

  private registerUserRoutes(): void {
    UserRoutes.register(this.router);
  }

  private registerAuthRoutes(): void {
    registerAuthRoutes(this.router);
  }

  private registerDocsRoutes(): void {
    registerDocsRoutes(this.router);
  }

  private registerMetricsRoutes(): void {
    registerMetricsRoutes(this.router);
  }

  private registerShoppingListRoutes(): void {
    registerShoppingListRoutes(this.router);
  }
}

export { RouteRegister };
