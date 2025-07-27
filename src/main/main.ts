import http from 'http';
import { router } from './router';
import { loggerMiddleware } from '../shared/http/middlewares/loggerMiddleware';

const server = http.createServer(async (request, response) => {
  const { url, method } = request;

  if (url === undefined || url === '' || method === undefined || method === '') {
    response.writeHead(400, { 'Content-Type': 'application/json' });
    return response.end(JSON.stringify({ message: 'Bad Request: URL or Method missing/empty' }));
  }

  await loggerMiddleware(request, response);

  router.resolve(request, response);
  return;
});

const PORT = 3333;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
