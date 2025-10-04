import { ServerResponse } from 'http';
import { Headers, Responder } from '@infrastructure/http/interfaces/IReplyResponder';

function applyHeaders(res: ServerResponse, headers?: Headers): void {
  if (headers) for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);
}

function reply(res: ServerResponse): Responder {
  return {
    json<T>(status: number, body: T, headers?: Headers): void {
      const payload = JSON.stringify(body);
      res.statusCode = status;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      applyHeaders(res, headers);
      res.setHeader('Content-Length', Buffer.byteLength(payload).toString());
      res.end(payload);
    },

    ok<T>(body: T, headers?: Headers): void {
      this.json(200, body, headers);
    },

    created<T>(body: T, location?: string, headers?: Headers): void {
      if (location != null) {
        res.setHeader('Location', location);
      }
      this.json(201, body, headers);
    },

    noContent(headers?: Headers): void {
      res.statusCode = 204;
      applyHeaders(res, headers);
      res.removeHeader('Content-Type');
      res.removeHeader('Content-Length');
      res.end();
    },

    text(status: number, body: string, headers?: Headers): void {
      res.statusCode = status;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      applyHeaders(res, headers);
      res.setHeader('Content-Length', Buffer.byteLength(body).toString());
      res.end(body);
    },

    html(status, body, headers): void {
      res.statusCode = status;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      applyHeaders(res, headers);
      res.setHeader('Content-Length', Buffer.byteLength(body).toString());
      res.end(body);
    },
  };
}

export { reply };
