import { Router } from './Router';
import { registerRoutes } from './registerRoutes';

const router = new Router();

registerRoutes(router);

export { router };
