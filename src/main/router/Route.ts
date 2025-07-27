import { IncomingMessage, ServerResponse } from 'http';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface RouteDefinition {
  path: string;
  method: HttpMethod;
  handler: (req: IncomingMessage, res: ServerResponse) => void;
}
