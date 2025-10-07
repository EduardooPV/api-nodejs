import { IncomingMessage, ServerResponse } from 'http';
import { handleHttpError } from '../utils/handleHttpError';

async function errorMiddleware(
  _request: IncomingMessage,
  response: ServerResponse,
  next: () => Promise<void>,
): Promise<void> {
  try {
    await next();
  } catch (error) {
    if (response.headersSent) {
      console.error('Error after headers sent. Destroying socket.', error);
      response.destroy();
      return;
    }
    handleHttpError(error, response);
  }
}

export { errorMiddleware };
