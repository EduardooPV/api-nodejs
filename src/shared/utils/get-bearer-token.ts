function getBearerToken(authorization?: string): string | null {
  if (authorization == null) return null;
  const [scheme, token] = authorization.split(/\s+/);
  if (!/^Bearer$/i.test(scheme) || !token) return null;
  return token;
}

export { getBearerToken };
