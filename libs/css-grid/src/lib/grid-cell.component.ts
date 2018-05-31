import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ng-playbook-grid-cell',
  template: `<ng-content></ng-content>`,
  styles: []
})
export class GridCellComponent implements OnInit {

  /** X Position */
  @HostBinding('style.grid-column-start')
  @Input() public x: number;

  /** Y Position */
  @HostBinding('style.grid-row-start')
  @Input() public y: number;

  @HostBinding('style.grid-column-end')
  public spanX;

  @HostBinding('style.grid-row-end')
  public spanY;

  /** Width */
  @Input() public set w(value: number) {
    this.spanX = `span ${value}`;
  }

  /** Height */
  @Input() public set h(value: number) {
    this.spanY = `span ${value}`;
  }

  constructor() { }

  ngOnInit() {
  }

}
