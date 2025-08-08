import { IncomingMessage, ServerResponse } from 'http';
import jsonwebtoken from 'jsonwebtoken';

function ensureAuthenticated(
  req: IncomingMessage & { userId?: string },
  res: ServerResponse,
  next: () => void,
): void {
  const authHeader = req.headers.authorization;

  if (authHeader == null || !authHeader.startsWith('Bearer ')) {
    res.writeHead(401);
    res.end({ message: 'Unauthorized' });
    return;
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = jsonwebtoken.verify(token, process.env.SECRET_JWT!) as { sub: string };
    req.userId = sub;
    next();
  } catch {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid token' }));
  }
}

export { ensureAuthenticated };
