import { Directive, Input, Output, EventEmitter, OnDestroy, Renderer2, ElementRef } from "@angular/core";
import { ParsedUrl } from "../reframe.interfaces";
import { Message, MessageService } from "../message.service";

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[reframeLaunch]'
})
export class HostDirective implements OnDestroy {

  @Input()
  public set reframeLaunch(value: string | ParsedUrl) {
    if (typeof value === 'string') {
      // TODO: parse url
    }

  }

  @Output() public messages: EventEmitter<Message> = new EventEmitter();

  @Output() public load: EventEmitter<any> = new EventEmitter();

  @Output() public loaded: EventEmitter<any> = new EventEmitter();

  private unsubscribeFn: Function;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private msgService: MessageService
  ) {}

  ngOnDestroy(): void {
    if (this.unsubscribeFn) {
      this.unsubscribeFn();
    }
  }

  private launch(iframeUrl: string, url: string) {
    this.unsubscribeFn = this.renderer.listen(
      this.elementRef.nativeElement,
      'load',
      () => {
        this.msgService.launch(this.elementRef, url);
        this.msgService.listen().subscribe(v => this.messages.next(v));

        this.loaded.next();
      }
    );

    this.load.next();
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'src',
      iframeUrl
    );
  }

}
