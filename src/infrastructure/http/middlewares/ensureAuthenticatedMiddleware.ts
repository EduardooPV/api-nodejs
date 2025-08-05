import { IncomingMessage, ServerResponse } from 'http';
import jsonwebtoken from 'jsonwebtoken';

function ensureAuthenticated(
  req: IncomingMessage,
  res: ServerResponse,
  next: (userId: string) => void,
): void {
  const authHeader = req.headers.authorization;

  if (authHeader == null || !authHeader.startsWith('Bearer ')) {
    res.writeHead(401);
    res.end({ message: 'Unauthorized' });
    return;
  }

  const [, token] = authHeader.split(' ');

  try {
    const payload = jsonwebtoken.verify(token, 'secret') as { sub: string };

    next(payload.sub);
  } catch {
    res.writeHead(401);
    res.end({ message: 'Invalid token' });
  }
}

export { ensureAuthenticated };
