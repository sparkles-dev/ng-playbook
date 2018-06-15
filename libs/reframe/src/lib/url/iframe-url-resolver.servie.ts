import { Injectable, Inject } from '@angular/core';
import {
  ParsedUrl,
  IFRAME_URL_RESOLVER_OPTIONS,
  IframeUrlResolverOptions
} from '../reframe.interfaces';

@Injectable()
export class IframeUrlResolver {
  constructor(
    @Inject(IFRAME_URL_RESOLVER_OPTIONS)
    private options: IframeUrlResolverOptions
  ) {}

  public resolveIframeUrl(url: ParsedUrl) {
    let value = this.options.prefix.concat('u/', url.appName, '/');

    if (url.entryPoint) {
      value = value.concat('#/external/', url.entryPoint);
    }

    if (url.params) {
      // TODO: append query params also to url?!?
    }

    return value;
  }
}
