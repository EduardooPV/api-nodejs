import http, { IncomingMessage, ServerResponse, Server } from 'http';
import { loggerMiddleware } from 'core/http/middlewares/loggerMiddleware';
import { router } from '.';
import { handleHttpError } from 'core/http/utils/handleHttpError';
import { metricsRecorder } from 'core/http/middlewares/metricsRecorder';

export class App {
  private server: Server;

  constructor() {
    this.server = http.createServer(this.requestListener.bind(this));
    this.configureServer();
  }

  private configureServer(): void {
    this.server.requestTimeout = 10_000;
    this.server.headersTimeout = 12_000;
    this.server.keepAliveTimeout = 5_000;
    this.server.maxRequestsPerSocket = 100;
  }

  private async requestListener(request: IncomingMessage, response: ServerResponse): Promise<void> {
    try {
      const { url, method } = request;

      if (url == null || method == null) {
        response.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        response.end(JSON.stringify({ error: { message: 'Bad Request: URL or Method missing' } }));
        return;
      }

      await new Promise<void>((resolve) => {
        metricsRecorder(request, response, async () => {
          await loggerMiddleware(request, response);
          await router.resolve(request, response);
          resolve();
        });
      });
    } catch (error) {
      if (response.headersSent) {
        console.error('Error after headers sent. Destroying socket.', error);
        response.destroy();
        return;
      }
      handleHttpError(error, response);
    }
  }

  public start(port: number): void {
    this.server.listen(port, '0.0.0.0', () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  }
}
