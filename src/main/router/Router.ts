import { IncomingMessage, ServerResponse } from 'http';
import { RouteDefinition } from './Route';
import { Params } from '../../shared/interfaces/IMatchResult';

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

    const pathname = new URL(`http://localhost${url}`).pathname;

    for (const route of this.routes) {
      if (route.method !== method) continue;

      const { matched, params } = this.matchPath(route.path, pathname);

      if (matched) {
        (req as IncomingMessage & { params?: Params }).params = params;
        return route.handler(req as IncomingMessage & { params?: Params }, res);
      }
    }

    res.statusCode = 404;
    res.end('Not Found');
  }

  private matchPath(
    routePath: string,
    actualPath: string,
  ): { matched: boolean; params?: Record<string, string> } {
    const routeSegments = routePath.split('/').filter(Boolean);
    const pathSegments = actualPath.split('/').filter(Boolean);

    if (routeSegments.length !== pathSegments.length) {
      return { matched: false };
    }

    const params: Record<string, string> = {};

    for (let i = 0; i < routeSegments.length; i++) {
      const routeSegment = routeSegments[i];
      const pathSegment = pathSegments[i];

      if (routeSegment.startsWith(':')) {
        const paramName = routeSegment.slice(1);
        params[paramName] = pathSegment;
      } else if (routeSegment !== pathSegment) {
        return { matched: false };
      }
    }

    return { matched: true, params };
  }
}
