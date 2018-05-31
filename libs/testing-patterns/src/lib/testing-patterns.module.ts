import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentComponent } from './component.component';
import { DirectiveDirective } from './directive.directive';
import { PipePipe } from './pipe.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ComponentComponent,
    DirectiveDirective,
    PipePipe
  ]
})
export class TestingPatternsModule {}
