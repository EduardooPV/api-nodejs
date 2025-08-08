const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: process.env.PORT ?? 3000,
  secretJwt: process.env.SECRET_JWT!,
  refreshSecretJwt: process.env.REFRESH_SECRET_JWT!,
  refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION ?? '7d',
  accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION ?? '15m',
};

export { env };
