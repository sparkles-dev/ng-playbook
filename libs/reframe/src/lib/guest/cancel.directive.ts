import { Directive, HostListener, ElementRef } from '@angular/core';
import { MessageService } from '../message/message.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[reframeCancel]'
})
export class CancelDirective {
  constructor(private messages: MessageService) {}

  @HostListener('click')
  public onClick() {
    this.messages.cancel(new ElementRef(window.parent), '');
  }
}
