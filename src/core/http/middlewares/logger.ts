import { IncomingMessage, ServerResponse } from 'http';
import { formatDateTime } from 'shared/utils/format-date-time';

class LoggerMiddleware {
  public static handle(request: IncomingMessage, response: ServerResponse): void {
    const { method, url } = request;
    const timestamp = formatDateTime(new Date());

    console.log(`[${timestamp}] >> ${method} ${url}`);

    response.on('finish', () => {
      console.log(`[${timestamp}] << ${method} ${url} [${response.statusCode}]`);
    });
  }
}

export { LoggerMiddleware };
