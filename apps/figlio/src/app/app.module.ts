import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxModule } from '@nrwl/nx';
import { ReframeModule } from '@ng-playbook/reframe';
import { AppComponent } from './app.component';
import { MyExternalComponent } from './entry/my-external.component';
import { FooComponent } from './foo.component';

@NgModule({
  declarations: [AppComponent, MyExternalComponent, FooComponent],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot(
      [
        {
          path: 'foo',
          component: FooComponent
        }
      ],
      {
        useHash: true
      }
    ),
    ReframeModule.forGuest([
      {
        path: 'one',
        component: MyExternalComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
