import { CommonModule } from '@angular/common';
import {
  NgModule,
  ModuleWithProviders,
  ANALYZE_FOR_ENTRY_COMPONENTS
} from '@angular/core';
import { provideRoutes, Routes, RouterModule } from '@angular/router';
import { GuestComponent } from './guest/guest.component';
import { GuestLaunchedGuard } from './guest/guest-launched-guard.service';
import { HostComponent } from './host/host.component';
import { FinishDirective } from './guest/finish.directive';
import { CancelDirective } from './guest/cancel.directive';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [GuestComponent, CancelDirective, FinishDirective],
  exports: [GuestComponent, CancelDirective, FinishDirective]
})
export class ReframeGuestModule {}

@NgModule({
  imports: [CommonModule],
  declarations: [HostComponent],
  exports: [HostComponent]
})
export class ReframeHostModule {}

@NgModule({
  imports: [CommonModule]
})
export class ReframeModule {
  public static forHost(): ModuleWithProviders {
    return {
      ngModule: ReframeHostModule
    };
  }

  public static forGuest(routes?: Routes): ModuleWithProviders {
    return {
      ngModule: ReframeGuestModule,
      providers: [
        GuestLaunchedGuard,

        // XX .. provideRoutes() is an alias for:
        /*
          {provide: ANALYZE_FOR_ENTRY_COMPONENTS, multi: true, useValue: routes},
          {provide: ROUTES, multi: true, useValue: routes},
        */
        provideRoutes([
          {
            path: 'external',
            component: GuestComponent,
            canActivateChild: [GuestLaunchedGuard],
            children: routes
          }
        ])
      ]
    };
  }
}
