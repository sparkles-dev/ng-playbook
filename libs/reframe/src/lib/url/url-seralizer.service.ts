import { Injectable } from '@angular/core';
import { deserializeUrl, serializeUrl } from './url-parser';
import { ParsedUrl } from '../reframe.interfaces';

@Injectable()
export class UrlSerializer {
  public serialize(url: ParsedUrl): string {
    return serializeUrl(url);
  }

  public deserialize(url: string): ParsedUrl {
    return deserializeUrl(url);
  }
}
