import http, { IncomingMessage, ServerResponse } from 'http';
import { loggerMiddleware } from '../middlewares/loggerMiddleware';
import { router } from '.';

function startServer(port: number): void {
  const server = http.createServer(async (request: IncomingMessage, response: ServerResponse) => {
    const { url, method } = request;

    if (url === undefined || url === '' || method === undefined || method === '') {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      return response.end(JSON.stringify({ message: 'Bad Request: URL or Method missing/empty' }));
    }

    await loggerMiddleware(request, response);

    return router.resolve(request, response);
  });

  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export { startServer };
