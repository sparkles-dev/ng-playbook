import { Component } from '@angular/core';
import { Message } from '@ng-playbook/reframe';

@Component({
  selector: 'ng-playbook-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading = false;
  messages: Message[] = [];

  onMessage(msg: Message) {
    this.messages.push(msg);
  }
}
