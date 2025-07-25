import { IncomingMessage } from 'http';

async function parseBody(request: IncomingMessage): Promise<object> {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => (body += chunk));
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
