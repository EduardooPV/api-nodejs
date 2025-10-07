import type { ServerResponse } from 'node:http';
import { registry } from 'core/http/utils/metrics';

async function getMetrics(_req: unknown, res: ServerResponse): Promise<void> {
  const body = await registry.metrics();
  res.statusCode = 200;
  res.setHeader('Content-Type', registry.contentType);
  res.end(body);
}

export { getMetrics };
