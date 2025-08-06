import { IncomingMessage } from 'http';

async function parseBody(request: IncomingMessage): Promise<object> {
  return new Promise((resolve, reject) => {
    const contentType = request.headers['content-type'];
    if (!(contentType?.includes('application/json') ?? false)) {
      return resolve({});
    }

    let body = '';
    const MAX_BODY_SIZE = 1e6;

    request.on('data', (chunk) => {
      body += chunk;
      if (body.length > MAX_BODY_SIZE) {
        request.destroy();
        return reject(new Error('Payload too large'));
      }
    });

    request.on('end', () => {
      try {
        if (!body) return resolve({});
        resolve(JSON.parse(body));
      } catch {
        reject(new SyntaxError('Invalid JSON'));
      }
    });
  });
}

export { parseBody };
