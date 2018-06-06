import { ReframedUrl } from "../url";
import { Component, OnInit, AfterViewChecked, ViewChild, AfterViewInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";

export interface AppLaunch {

  onAppLaunch(url: ReframedUrl)
}

@Component({
  // XX ... maybe do not use router at all?
  //    ... use dynamic components directly?
  //    ... make this a host for the dynamic components (the entry points) in the child app?
  template: `<router-outlet></router-outlet>`
})
export class GuestComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild(RouterOutlet)
  routerOutlet: RouterOutlet

  ngOnInit() {
    debugger;
  }

  ngAfterViewInit() {
    const component = this.routerOutlet.component;

    // TODO ... ExpressionChangedAfterItHasBeenCheckedError
    (component as any).onAppLaunch({
      url: 'foooooo .. why not working?!?!'
    });

    debugger;
  }

  ngAfterViewChecked() {
    debugger;
  }

}
