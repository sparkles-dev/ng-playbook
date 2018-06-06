import { Injectable, ElementRef } from "@angular/core";
import { ReframedUrl } from "./url";
import { fromEvent, Observable } from "rxjs";
import { map, filter } from 'rxjs/operators';

export enum MessageTypes {
  LAUNCH = 'LAUNCH',
  FINISH = 'FINISH',
  CANCEL = 'CANCEL'
}

export interface Message {
  type: string;
  payload: any;
}

export interface LaunchMessage {
  type: MessageTypes.LAUNCH,
  payload: ReframedUrl
}

export interface CancelMessage {
  type: MessageTypes.CANCEL,
  payload: ReframedUrl
}

export interface FinishMessage {
  type: MessageTypes.FINISH,
  payload: ReframedUrl
}

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
debugger;
      target.nativeElement.postMessage(msg, '*');
    }

  }

  public listen(): Observable<Message> {

    return fromEvent(window, 'message')
      .pipe(
        map((event) => {
          try {
            const msgEvent = event as MessageEvent;
            const msg: Message = JSON.parse(msgEvent.data);
debugger;
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
