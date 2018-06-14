import { Injectable, ElementRef } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ReframedUrl } from './url';
import { MessageTypes, Message, LaunchMessage, CancelMessage, FinishMessage } from './message.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public notify(target: ElementRef, type: string, payload: any): void {
    const msg = JSON.stringify({
      type,
      payload
    });

    // TODO: safe guard target origin

    if (target.nativeElement instanceof HTMLIFrameElement) {
      const window = target.nativeElement.contentWindow;
      window.postMessage(msg, '*');
    } else if (typeof target.nativeElement.postMessage === 'function') {
      target.nativeElement.postMessage(msg, '*');
    }
  }

  public listen(): Observable<Message> {
    return fromEvent(window, 'message').pipe(
      map(event => {
        try {
          const msgEvent = event as MessageEvent;
          const msg: Message = JSON.parse(msgEvent.data);
          return msg;
        } catch (e) {
          return undefined;
        }
      }),
      filter(event => event !== undefined)
    );
  }

  public launch(target: ElementRef, payload: any) {
    this.notify(target, MessageTypes.LAUNCH, payload);
  }

  public finish(target: ElementRef, payload: any) {
    this.notify(target, MessageTypes.FINISH, payload);
  }

  public cancel(target: ElementRef, payload: any) {
    this.notify(target, MessageTypes.CANCEL, payload);
  }
}
