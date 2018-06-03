import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlComponent } from './form-control.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FormControlComponent
  ],
  exports: [
    FormControlComponent
  ]
})
export class FormsModule {}
