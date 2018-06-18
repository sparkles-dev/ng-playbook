import { Injectable, Inject } from '@angular/core';
import {
  ParsedUrl,
  REFRAME_OPTIONS,
  ReframeOptions
} from '../reframe.interfaces';
import { deserializeUrl, serializeUrl } from './url-parser';

@Injectable()
export class UrlSerializer {
  constructor(@Inject(REFRAME_OPTIONS) private options: ReframeOptions) {}

  public serialize(url: ParsedUrl): string {
    return serializeUrl(url, this.options.urlScheme);
  }

  public deserialize(url: string): ParsedUrl {
    return deserializeUrl(url, this.options.urlScheme);
  }
}
