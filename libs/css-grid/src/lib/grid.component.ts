import { Component, OnInit, Input, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'ng-playbook-grid',
  template: `
    <ng-content select="ng-playbook-grid-cell"></ng-content>
  `,
  styles: [
    `
    :host {
      display: grid;
    }
  `
  ]
})
export class GridComponent implements OnInit {
  _columns: number;
  _rows: number;

  @Input()
  public set columns(value: number) {
    this._columns = value;

    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'grid-template-columns',
      '1fr '.repeat(value)
    );
  }

  @Input()
  public set rows(value: number) {
    this._rows = value;

    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'grid-template-rows',
      '1fr '.repeat(value)
    );
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {}
}
