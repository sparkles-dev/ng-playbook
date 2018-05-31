import { Component, ViewChild, ElementRef } from '@angular/core';
import { DomElementRef } from '@ng-playbook/testing';
import { PipePipe } from './pipe.pipe';
import { TestBed } from '@angular/core/testing';

describe('PipePipe (unit testing)', () => {

  it('create an instance', () => {
    const pipe = new PipePipe();
    expect(pipe).toBeTruthy();
  });

  it(`should transform a string input`, () => {
    const pipe = new PipePipe();
    expect(pipe.transform('foobar')).toEqual(`Look, a foobar`);
  });
});

describe('PipePipe (integraton testing)', () => {
  @Component({
    template: `<p #element>{{ 'foobar' | pipe }}</p>`
  })
  class TestingComponent {

    @ViewChild('element', { read: ElementRef })
    public elementRef: ElementRef;

    public get domElementRef(): DomElementRef {
      return new DomElementRef(this.elementRef);
    }

    static create() {
      return TestBed.createComponent(TestingComponent);
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        TestingComponent,
        PipePipe
      ]
    });
  });

  it('create transform input value', () => {
    const fixture = TestingComponent.create();
    fixture.detectChanges();
    expect(fixture.componentInstance.domElementRef.innerHTML).toEqual(`Look, a foobar`);
  });
});
