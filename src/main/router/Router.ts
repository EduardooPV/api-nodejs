import { IncomingMessage, ServerResponse } from 'http';
import { RouteDefinition } from './Route';

export class Router {
  private routes: RouteDefinition[] = [];

  register(route: RouteDefinition): void {
    this.routes.push(route);
  }

  resolve(req: IncomingMessage, res: ServerResponse): void {
    const method = req.method;
    const url = req.url;

    if (method == null || url == null) {
      res.statusCode = 400;
      res.end('Bad Request');
      return;
    }

    const route = this.routes.find((r) => r.method === method && this.matchPath(r.path, url));

    if (route) {
      return route.handler(req, res);
    }

    res.statusCode = 404;
    res.end('Not Found');
  }

  private matchPath(routePath: string, url: string): boolean {
    const pathname = new URL(`http://localhost${url}`).pathname;
    return pathname === routePath;
  }
}
