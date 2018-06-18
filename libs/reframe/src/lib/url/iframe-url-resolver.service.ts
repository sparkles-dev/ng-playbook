import { Injectable, Inject } from '@angular/core';
import {
  ParsedUrl,
  REFRAME_OPTIONS,
  ReframeOptions
} from '../reframe.interfaces';

@Injectable()
export class IframeUrlResolver {
  constructor(@Inject(REFRAME_OPTIONS) private options: ReframeOptions) {}

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
