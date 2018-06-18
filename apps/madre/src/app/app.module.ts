import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NxModule } from '@nrwl/nx';
import { ReframeModule } from '@ng-playbook/reframe';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    ReframeModule.forHost({
      prefix: 'http://localhost:4300/'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
