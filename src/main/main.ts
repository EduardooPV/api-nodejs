import http from 'http';
import { router } from './router';
import { formatDateTime } from '../shared/utils/formatDateTime';

const server = http.createServer(async (request, response) => {
  const { url, method } = request;

  if (url === undefined || url === '' || method === undefined || method === '') {
    response.writeHead(400, { 'Content-Type': 'application/json' });
    return response.end(JSON.stringify({ message: 'Bad Request: URL or Method missing/empty' }));
  }

  const now = new Date();
  const formattedDate = formatDateTime(now);
  console.log(`[${formattedDate}] Incoming Request: ${method} ${url}`);

  await router(request, response);
  return;
});

const PORT = 3333;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
