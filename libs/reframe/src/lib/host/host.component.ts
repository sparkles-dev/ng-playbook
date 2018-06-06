import { Component, Input, Renderer2, ViewChild, ElementRef, OnDestroy, Output } from "@angular/core";
import { MessageService, Message } from "../message.service";
import { EventEmitter } from "@angular/core";

@Component({
  selector: 'ng-playbook-reframe-host',
  template: `
    <iframe #frame></iframe>
  `,
  styles: [`
    iframe {
      width: 100%;
      height: 100%;
      border: 0;
    }
  `]
})
export class HostComponent implements OnDestroy {

  /** @internal */
  @ViewChild('frame', { read: ElementRef })
  iframeElement: ElementRef;

  @Input()
  public set url(value: string) {
    // TODO: map url to params
    const iframeUrl = 'http://localhost:4444/#/external/one'

    this.launch(iframeUrl, value);
  }

  @Output()
  public messages: EventEmitter<Message> = new EventEmitter();

  private unsubscribeFn: Function;

  constructor(
    private renderer: Renderer2,
    private msgService: MessageService
  ) {}

  private launch(iframeUrl: string, url: string) {
    this.unsubscribeFn = this.renderer.listen(this.iframeElement.nativeElement, 'load', () => {
      this.msgService.launch(this.iframeElement, url);

      this.msgService.listen().subscribe(
        (v) => this.messages.next(v)
      );
    });

    this.renderer.setAttribute(this.iframeElement.nativeElement, 'src', iframeUrl);
  }

  ngOnDestroy(): void {
    if (this.unsubscribeFn) {
      this.unsubscribeFn();
    }
  }

}
