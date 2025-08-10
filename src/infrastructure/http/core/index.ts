import { registerRoutes } from './registerRoutes';
import { Router } from './Router';

const router = new Router();
registerRoutes(router);

export { router };
