import {
  Directive,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  Renderer2,
  ElementRef
} from '@angular/core';
import { ParsedUrl } from '../reframe.interfaces';
import { MessageService } from '../message/message.service';
import { Message } from '../message/message.interfaces';

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

    this.launch();
  }

  @Output() public messages: EventEmitter<Message> = new EventEmitter();

  @Output() public load: EventEmitter<any> = new EventEmitter();

  @Output() public loaded: EventEmitter<any> = new EventEmitter();

  private unsubscribeFn: Function;
  private iframeUrl: string;
  private parsedUrl: ParsedUrl;

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

  private launch() {
    this.unsubscribeFn = this.renderer.listen(
      this.elementRef.nativeElement,
      'load',
      () => {
        this.msgService.launch(this.elementRef, this.parsedUrl);
        this.msgService.messages$.subscribe(v => this.messages.next(v));

        this.loaded.next();
      }
    );

    this.load.next();
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'src',
      this.iframeUrl
    );
  }
}
