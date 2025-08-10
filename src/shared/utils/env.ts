import { z } from 'zod';

const duration = z.string().regex(/^\d+(ms|s|m|h|d)$/i, 'Use formatos como 15m, 7d, 30s');

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  SECRET_JWT: z.string().min(25, 'SECRET_JWT deve ter pelo menos 25 chars'),
  REFRESH_SECRET_JWT: z.string().min(25, 'REFRESH_SECRET_JWT deve ter pelo menos 25 chars'),
  REFRESH_TOKEN_EXPIRATION: duration.default('7d'),
  ACCESS_TOKEN_EXPIRATION: duration.default('15m'),
});

const parsed = EnvSchema.safeParse(process.env);
if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

const env = Object.freeze({
  nodeEnv: parsed.data.NODE_ENV,
  port: parsed.data.PORT,
  secretJwt: parsed.data.SECRET_JWT,
  accessTokenExpiration: parsed.data.ACCESS_TOKEN_EXPIRATION,
  refreshSecretJwt: parsed.data.REFRESH_SECRET_JWT,
  refreshTokenExpiration: parsed.data.REFRESH_TOKEN_EXPIRATION,
});

export { env };
