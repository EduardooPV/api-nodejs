/* eslint-disable @typescript-eslint/explicit-function-return-type */
import http, { IncomingMessage, ServerResponse } from 'http';
import { loggerMiddleware } from '../middlewares/loggerMiddleware';
import { router } from '.';
import { handleHttpError } from '../utils/handleHttpError';
import { metricsRecorder } from '../middlewares/metricsRecorder';

function startServer(port: number): void {
  const server = http.createServer(async (request: IncomingMessage, response: ServerResponse) => {
    try {
      const { url, method } = request;

      if (url === undefined || url === '' || method === undefined || method === '') {
        response.statusCode = 400;
        response.setHeader('Content-Type', 'application/json; charset=utf-8');
        return response.end(
          JSON.stringify({ error: { message: 'Bad Request: URL or Method missing/empty' } }),
        );
      }

      return await new Promise<void>((resolve, reject) => {
        metricsRecorder(request, response, () => {
          (async () => {
            await loggerMiddleware(request, response);
            await router.resolve(request, response);
          })()
            .then(resolve)
            .catch(reject);
        });
      });
    } catch (error) {
      if (response.headersSent) {
        response.destroy();
        return;
      }
      handleHttpError(error, response);
    }
  });

  server.requestTimeout = 10_000;
  server.headersTimeout = 12_000;
  server.keepAliveTimeout = 5_000;
  server.maxRequestsPerSocket = 100;

  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export { startServer };
