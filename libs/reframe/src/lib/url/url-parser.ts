import { ParsedUrl } from '../reframe.interfaces';

const PREFIX = 'u://';

const QUERY_PARAM_RE = /^[^=?&#]+/;
// Return the name of the query param at the start of the string or an empty string
function matchQueryParamName(str: string): string {
  const match = str.match(QUERY_PARAM_RE);
  return match ? match[0] : '';
}

const QUERY_PARAM_VALUE_RE = /^[^?&#]+/;
// Return the value of the query param at the start of the string or an empty string
function matchQueryParamValue(str: string): string {
  const match = str.match(QUERY_PARAM_VALUE_RE);
  return match ? match[0] : '';
}

// Query keys/values should have the "+" replaced first, as "+" in a query string is " ".
// decodeURIComponent function will not decode "+" as a space.
function decodeQuery(s: string): string {
  return decodeURIComponent(s.replace(/\+/g, '%20'));
}

export class UrlParser {
  private remaining: string;

  constructor(url: string) {
    this.remaining = url;
  }

  parse(): ParsedUrl {
    const url = '' + this.remaining;
    if (!this.consumeOptional(PREFIX)) {
      throw new Error(`Url must start with ${PREFIX}, given ${this.remaining}`);
    }

    const appName = this.captureOptional('/');
    const entryPoint = this.captureOptional('?');
    const params = {};

    do {
      const key = matchQueryParamName(this.remaining);
      if (!key) {
        break;
      }
      this.consumeOptional(key);

      let value: any = '';
      if (this.consumeOptional('=')) {
        value = matchQueryParamValue(this.remaining);
        if (value) {
          this.consumeOptional(value);
        } else {
          value = '';
        }
      }

      const decodedKey = decodeQuery(key);
      const decodedVal = decodeQuery(value);
      if (params.hasOwnProperty(decodedKey)) {
        // Append to existing values
        let currentVal = params[decodedKey];
        if (!Array.isArray(currentVal)) {
          currentVal = [currentVal];
          params[decodedKey] = currentVal;
        }
        currentVal.push(decodedVal);
      } else {
        // Create a new value
        params[decodedKey] = decodedVal;
      }
    } while (this.consumeOptional('&'));

    return {
      url,
      appName,
      entryPoint,
      params
    };
  }

  private peekStartsWith(str: string): boolean {
    return this.remaining.startsWith(str);
  }

  // Consumes the prefix when it is present and returns whether it has been consumed
  private consumeOptional(str: string): boolean {
    if (this.peekStartsWith(str)) {
      this.remaining = this.remaining.substring(str.length);

      return true;
    }

    return false;
  }

  private captureOptional(str: string): string {
    const idx = this.remaining.indexOf(str);

    let value: string;
    if (idx >= 0) {
      value = this.remaining.substr(0, idx);
      this.remaining = this.remaining.substr(idx + 1);
    } else {
      value = this.remaining.substr(0);
      this.remaining = '';
    }

    return value;
  }
}

export function deserializeUrl(url: string): ParsedUrl {
  return new UrlParser(url).parse();
}

export function serializeUrl(url: ParsedUrl) {
  let urlString = `${PREFIX}/${url.appName}/${url.entryPoint}`;

  if (url.params) {
    const queryString = Object.keys(url.params)
      .map(key => {
        const value = url.params[key];

        return encodeURIComponent(key) + '=' + encodeURIComponent(value);
      })
      .join('&');

    urlString = urlString + '?' + queryString;
  }

  return urlString;
}
