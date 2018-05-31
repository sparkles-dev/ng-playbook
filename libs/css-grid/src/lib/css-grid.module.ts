import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { GridCellComponent } from './grid-cell.component';
@NgModule({
  imports: [CommonModule],
  declarations: [GridComponent, GridCellComponent]
})
export class CssGridModule {}
