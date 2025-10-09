import { registerRoutes } from './register-routes';
import { Router } from './router';

const router = new Router();
registerRoutes(router);

export { router };
