import { Injectable } from "@angular/core";
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { MessageService, MessageTypes } from "../message.service";
import { map } from "rxjs/operators";

@Injectable()
export class GuestLaunchedGuard implements CanActivateChild {

  constructor(
    private messages: MessageService
  ) {}

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    return this.messages.listen()
      .pipe(
        map(msg => {
          debugger;

          // TODO: grab reference to intance of child component, call custom lifecycle hook

          return msg.type === MessageTypes.LAUNCH;
        })
      );
  }

}
