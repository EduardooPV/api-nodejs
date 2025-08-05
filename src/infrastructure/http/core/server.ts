import http from 'http';
import { router } from './routes';
import { loggerMiddleware } from '../middlewares/loggerMiddleware';

function startServer(port: number): void {
  const server = http.createServer(async (request, response) => {
    const { url, method } = request;

    if (url === undefined || url === '' || method === undefined || method === '') {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      return response.end(JSON.stringify({ message: 'Bad Request: URL or Method missing/empty' }));
    }

    await loggerMiddleware(request, response);

    router.resolve(request, response);
  });

  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export { startServer };
