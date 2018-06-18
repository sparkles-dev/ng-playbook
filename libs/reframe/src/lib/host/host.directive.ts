import {
  Directive,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  Renderer2,
  ElementRef,
  NgZone,
  OnInit
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ParsedUrl } from '../reframe.interfaces';
import { Message } from '../message/message.interfaces';
import { MessageService } from '../message/message.service';
import { UrlSerializer } from '../url/url-serializer.service';
import { IframeUrlResolver } from '../url/iframe-url-resolver.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[reframeLaunch]'
})
export class HostDirective implements OnInit, OnDestroy {
  @Input()
  public set reframeLaunch(value: string | ParsedUrl) {
    if (typeof value === 'string') {
      this.parsedUrl = this.urlSerializer.deserialize(value);
    } else {
      this.parsedUrl = value;
    }
    this.iframeUrl = this.iframeUrlResolver.resolveIframeUrl(this.parsedUrl);

    this.launch();
  }

  @Output() public reframeMessage: EventEmitter<Message> = new EventEmitter();

  @Output() public reframeLoad: EventEmitter<any> = new EventEmitter();

  private unsubscribeFn: Function;
  private subscriptions: Subscription[] = [];
  private iframeUrl: string;
  private parsedUrl: ParsedUrl;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private msgService: MessageService,
    private ngZone: NgZone,
    private urlSerializer: UrlSerializer,
    private iframeUrlResolver: IframeUrlResolver
  ) {}

  ngOnInit() {
    const sub = this.msgService.messages$.subscribe(value => {
      this.ngZone.runTask(() => {
        this.reframeMessage.next(value);
      });
    });
    this.subscriptions = this.subscriptions.concat(sub);
  }

  ngOnDestroy(): void {
    this.clearListener();

    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private launch() {
    this.clearListener();

    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'src',
      this.iframeUrl
    );

    this.unsubscribeFn = this.renderer.listen(
      this.elementRef.nativeElement,
      'load',
      () => {
        this.onIframeLoaded();
      }
    );
  }

  private onIframeLoaded() {
    this.msgService.launch(this.elementRef, this.parsedUrl);

    this.reframeLoad.next();
  }

  private clearListener() {
    if (this.unsubscribeFn) {
      this.unsubscribeFn();
    }
  }
}
