import { IncomingMessage, ServerResponse } from 'http';
import { createUserController } from '../domains/users/useCases/CreateUser';

export async function router(request: IncomingMessage, response: ServerResponse): Promise<void> {
  const { url, method } = request;

  if (url === '/users' && method === 'POST') {
    return createUserController.handle(request, response);
  }

  response.writeHead(404, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({ message: 'Route not found' }));
}
