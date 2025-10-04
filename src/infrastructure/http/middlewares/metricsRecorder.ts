import type { IncomingMessage, ServerResponse } from 'node:http';
import { httpRequestDuration, httpRequestsTotal } from '@shared/metrics';

type ReqWithMetrics = IncomingMessage & { metricsRoute?: string };

function metricsRecorder(req: ReqWithMetrics, res: ServerResponse, next: () => void): void {
  if (req.url?.startsWith('/metrics') ?? false) return next();

  const method = (req.method ?? 'GET').toUpperCase();
  const endTimer = httpRequestDuration.startTimer({ method });

  res.once('finish', onDone);
  res.once('close', onDone);
  function onDone(): void {
    const labels = {
      method,
      route: req.metricsRoute ?? 'unknown',
      status: String(res.statusCode || 0),
    };
    httpRequestsTotal.inc(labels);
    endTimer(labels);
  }

  next();
}

export { metricsRecorder };
