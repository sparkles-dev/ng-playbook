import { Component } from "@angular/core";
import { AppLaunch, ReframedUrl } from "@ng-playbook/reframe";

@Component({
  template: `
    <h1>Child Launch works!</h1>
    <pre>{{ url | json }}</pre>
    <button reframeFinish>FINISH</button>
    <button reframeCancel>CANCEL</button>
    <a [routerLink]="['/foo']">go to foo</a>
  `
})
export class MyExternalComponent implements AppLaunch {

  url: ReframedUrl;

  onAppLaunch(url: ReframedUrl) {
    debugger;
    this.url = url;
  }

}
