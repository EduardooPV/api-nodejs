import { IncomingMessage, ServerResponse } from 'http';
import { HttpMethod } from '../interfaces/IHttpMethod';

export interface RouteDefinition {
  path: string;
  method: HttpMethod;
  handler: (
    req: IncomingMessage & { params?: Record<string, string> },
    res: ServerResponse,
  ) => void | Promise<void>;
}
