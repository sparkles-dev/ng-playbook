import { Directive, HostListener, ElementRef } from '@angular/core';
import { MessageService } from '../message.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[reframeFinish]'
})
export class FinishDirective {
  constructor(private messages: MessageService) {}

  @HostListener('click')
  public onClick() {
    this.messages.finish(new ElementRef(window.parent), '');
  }
}
