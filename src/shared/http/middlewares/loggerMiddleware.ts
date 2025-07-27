import { IncomingMessage, ServerResponse } from 'http';
import { formatDateTime } from '../../utils/formatDateTime';

export async function loggerMiddleware(
  request: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  const { method, url } = request;
  const timestamp = formatDateTime(new Date());

  console.log(`[${timestamp}] >> ${method} ${url}`);

  response.on('finish', () => {
    console.log(`[${timestamp}] << ${method} ${url} [${response.statusCode}]`);
  });
}
