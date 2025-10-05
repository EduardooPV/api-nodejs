import { IncomingMessage, ServerResponse } from 'http';
import jsonwebtoken from 'jsonwebtoken';
import { env } from '@shared/utils/env';
import { getBearerToken } from '@shared/utils/getBearerToken';
import { MissingAuthHeader } from '@domain/auth/errors/MissingAuthHeader';
import { InvalidAccessToken } from '@domain/auth/errors/InvalidAccessToken';

function ensureAuthenticated(
  req: IncomingMessage & { userId?: string },
  _res: ServerResponse,
  next: () => void,
): void {
  const token = getBearerToken(req.headers.authorization);

  if (token == null) throw new MissingAuthHeader();

  try {
    const { sub } = jsonwebtoken.verify(token, env.secretJwt) as { sub: string };
    req.userId = sub;
    next();
  } catch (error) {
    const name = (error as Error).name;
    if (name === 'TokenExpiredError') throw new InvalidAccessToken({ reason: 'expired' });
    if (name === 'JsonWebTokenError') throw new InvalidAccessToken({ reason: 'signature' });
    throw new InvalidAccessToken();
  }
}

export { ensureAuthenticated };
