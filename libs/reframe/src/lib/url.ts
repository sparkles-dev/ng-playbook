/**
 * Example: `scheme://foo/bar?a=b`
 *
 * App: "foo"
 * Action: "bar"
 * Params: "a" with value "b"
 */
export interface ReframedUrl {
  url: string;
  app?: string;
  action?: string;
  params?: {
    [key: string]: any
  };
}

export function parse(value: string): ReframedUrl {
  // TODO: parse the URL

  return {
    url: value
  };
}

export function build(app: string, action: string, params: {[key: string]: any}): ReframedUrl {
  const paramString = Object.keys(params)
    .map(key => {

      return {
        key,
        value: params[key]
      };
    })
    .map(param => {

      return `${param.key}=${param.value}`;
    })
    .join(`&`);

  return {
    url: `scheme://${app}/${action}?${paramString}`,
    app,
    action,
    params
  };
}
