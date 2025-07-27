import { MatchResult, Params } from '../interfaces/IMatchResult';

export function matchPath(path: string, routePath: string): MatchResult {
  const paramNames: string[] = [];
  const regexPath = routePath.replace(/:([^/]+)/g, (_, paramName) => {
    paramNames.push(paramName);
    return '([^/]+)';
  });

  const regex = new RegExp(`^${regexPath}$`);
  const match = path.match(regex);

  if (!match) return { matched: false, params: {} };

  const values = match.slice(1);
  const params: Params = {};
  paramNames.forEach((name, i) => {
    params[name] = values[i];
  });

  return { matched: true, params };
}
