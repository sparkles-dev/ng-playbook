import { Directive, HostListener, ElementRef } from "@angular/core";
import { MessageService } from "../message.service";

@Directive({
  selector: '[reframeCancel]'
})
export class CancelDirective {

  constructor(
    private messages: MessageService
  ) {}

  @HostListener('click')
  public onClick() {
debugger;
    this.messages.cancel(new ElementRef(window.top), '');
  }

}
