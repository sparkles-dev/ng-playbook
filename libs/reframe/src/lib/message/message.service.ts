import { Injectable, ElementRef } from '@angular/core';
import { fromEvent, Observable, ReplaySubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import {
  MessageTypes,
  Message
} from './message.interfaces';

const MESSAGE_BUS$ = new ReplaySubject<Message>();

fromEvent(window, 'message')
  .pipe(
    map((event: MessageEvent) => {
      return deserialize(event.data);
    }),
    filter(msg => msg !== undefined)
  )
  .subscribe(MESSAGE_BUS$);

function serialize(msg: Message): any {
  return JSON.stringify(msg);
}

function deserialize(data: any): Message | undefined {
  try {
    const msgEvent = event as MessageEvent;
    const msg: Message = JSON.parse(msgEvent.data);
    return msg;
  } catch (e) {
    return undefined;
  }
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public notify(target: ElementRef, type: string, payload: any): void {
    const msg = serialize({ type, payload });

    // TODO: safe guard target origin
    const targetOrigin = '*';

    if (target.nativeElement instanceof HTMLIFrameElement) {
      target.nativeElement.contentWindow.postMessage(msg, targetOrigin);
    } else if (typeof target.nativeElement.postMessage === 'function') {
      target.nativeElement.postMessage(msg, targetOrigin);
    }
  }

  public get messages$(): Observable<Message> {
    return MESSAGE_BUS$.asObservable();
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
