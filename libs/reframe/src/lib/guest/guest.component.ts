import {
  Component,
  OnInit,
  AfterViewChecked,
  ViewChild,
  AfterViewInit,
  ViewContainerRef,
  ComponentFactoryResolver,
  Inject,
  ComponentRef,
  OnDestroy
} from '@angular/core';
import { filter } from 'rxjs/operators';
import { MessageTypes, LaunchMessage } from '../message/message.interfaces';
import { MessageService } from '../message/message.service';
import { ENTRIES, Entry, isAppLaunch, ParsedUrl } from '../reframe.interfaces';

@Component({
  template: `<ng-container #outlet></ng-container>`
})
export class GuestComponent
  implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
  @ViewChild('outlet', { read: ViewContainerRef })
  outlet: ViewContainerRef;

  private componentRef: ComponentRef<any>;

  constructor(
    private cfr: ComponentFactoryResolver,
    @Inject(ENTRIES) private entries: Entry[],
    private message: MessageService
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.cleanComponentRef();
  }

  ngAfterViewInit() {
    this.message.messages$
      .pipe(filter(msg => msg.type === MessageTypes.LAUNCH))
      .subscribe((msg: LaunchMessage) => this.createComponent(msg.payload));
  }

  ngAfterViewChecked() {}

  private createComponent(url: ParsedUrl) {
    const entry = this.entries.find(e => e.path === url.entryPoint);
    if (entry) {
      const factory = this.cfr.resolveComponentFactory(entry.component);

      this.cleanComponentRef();
      this.componentRef = this.outlet.createComponent(factory);

      const component = this.componentRef.instance;
      if (isAppLaunch(component)) {
        component.onAppLaunch(url);
      }
    }
  }

  private cleanComponentRef() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
