import { Component, NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createCustomElement } from '@angular/elements';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: `ng-playbook-elements`,
  template: `elements works!`
})
export class ElementsComponent {
}

@NgModule({
  imports: [
    CommonModule,
    BrowserModule
  ],
  declarations: [ElementsComponent],
  entryComponents: [ElementsComponent]
})
export class ElementalsModule {

  constructor(
    private injector: Injector
  ) {}

  ngDoBootstrap() {
    const element = createCustomElement(ElementsComponent, {
      injector: this.injector
    });
    customElements.define('ng-playbook-elements', element);
  }

}

platformBrowserDynamic().bootstrapModule(ElementalsModule)
  .catch(err => console.log(err));
