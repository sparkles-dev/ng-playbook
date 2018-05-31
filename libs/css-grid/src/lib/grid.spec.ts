import { Component, ViewChild, ElementRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DomElementRef } from '@ng-playbook/testing';
import { GridComponent } from './grid.component';
import { GridCellComponent } from './grid-cell.component';

@Component({
  template: `<ng-playbook-grid></ng-playbook-grid>`
})
export class TestingComponent {

  @ViewChild(GridComponent, { read: GridComponent })
  grid: GridComponent;

  @ViewChild(GridComponent, { read: ElementRef })
  gridElementRef: ElementRef;

  public static create(template?: string) {
    if (template) {
      TestBed.overrideTemplate(TestingComponent, template);
    }

    return TestBed.createComponent(TestingComponent);
  }
}

describe('grid', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        GridComponent,
        GridCellComponent,
        TestingComponent
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestingComponent.create();
    fixture.detectChanges();
    expect(fixture.componentInstance.grid).toBeTruthy();
  });

  describe(`rows and columns`, () => {
    it(`should render css grid areas`, () => {
      const fixture = TestingComponent.create(
        `<ng-playbook-grid [rows]="4" [columns]="3"></ng-playbook-grid>`);
      fixture.detectChanges();
      const element = new DomElementRef(fixture.componentInstance.gridElementRef);

      const columnsProperty = element.getComputedStyle().getPropertyValue('grid-template-columns');
      expect(columnsProperty.split(' ').length).toEqual(3);
      const rowsProperty = element.getComputedStyle().getPropertyValue('grid-template-rows');
      expect(rowsProperty.split(' ').length).toEqual(4);
    });

    it(`should render equal widths/heights`, () => {
      const fixture = TestingComponent.create(
        `<ng-playbook-grid
          [style.width]="'300px'"
          [style.height]="'400px'"
          [rows]="4"
          [columns]="3"></ng-playbook-grid>`);
      fixture.detectChanges();
      const element = new DomElementRef(fixture.componentInstance.gridElementRef);

      expect(element.getComputedStyle().getPropertyValue('grid-template-columns'))
        .toEqual('100px 100px 100px');
      expect(element.getComputedStyle().getPropertyValue('grid-template-rows'))
        .toEqual('100px 100px 100px 100px');
    });
  });

  describe(`nested cells`, () => {
    it(`should ....`, () => {
      const fixture = TestingComponent.create(
        `<ng-playbook-grid [style.width]="'300px'" [style.height]="'400px'"
                           [rows]="4" [columns]="3">
          <ng-playbook-grid-cell [x]="1" [y]="1" [w]="3" [h]="1">
            <p>foo</p>
          </ng-playbook-grid-cell>
          <ng-playbook-grid-cell [x]="3" [y]="2">
            <p>bar</p>
          </ng-playbook-grid-cell>
        </ng-playbook-grid>`);
      fixture.detectChanges();
      const element = new DomElementRef(fixture.componentInstance.gridElementRef);

      expect(element.getComputedStyle().getPropertyValue('grid-template-columns'))
        .toEqual('100px 100px 100px');
      expect(element.getComputedStyle().getPropertyValue('grid-template-rows'))
        .toEqual('100px 100px 100px 100px');
    });

  });

});
