import { Component, ElementRef, ComponentRef, ViewChild } from '@angular/core';
import { async, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DomElementRef } from '@ng-playbook/testing';
import { B, A, R } from '@angular/cdk/keycodes';
import { ComponentComponent } from './component.component';

describe('ComponentComponent (fixture testing)', () => {
  let component: ComponentComponent;
  let fixture: ComponentFixture<ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ComponentComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`value`, () => {
    it(`should render the value to the textfield`, () => {
      component.value = 'foo';
      fixture.detectChanges();

      const element = new DomElementRef(fixture.elementRef);
      expect(element.querySelector('input').attribute('value')).toEqual('foo');
    });
  });

  describe(`disabled`, () => {
    it(`should add a disabled attribute`, () => {
      component.disabled = true;
      fixture.detectChanges();

      const element = new DomElementRef(fixture.elementRef);
      expect(element.querySelector('input').attribute('disabled')).toBeTruthy();
    });
  });
});


describe(`ComponentComponent (integration)`, () => {

  @Component({
    template: `<ng-playbook-component #component [value]="'foo'"></ng-playbook-component>`
  })
  class TestingComponent {

    @ViewChild('component', { read: ComponentComponent })
    public component: ComponentComponent;

    @ViewChild('component', { read: ElementRef })
    public componentElementRef: ElementRef;

    public get domElementRef(): DomElementRef {
      return new DomElementRef(this.componentElementRef);
    }

    static create(template?: string) {
      if (template !== undefined) {
        TestBed.overrideTemplate(TestingComponent, template);
      }

      return TestBed.createComponent(TestingComponent);
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ComponentComponent,
        TestingComponent
      ]
    })
    .compileComponents();
  });

  describe(`value`, () => {
    it(`should render the value to the textfield`, () => {
      const fixture = TestingComponent.create();
      fixture.detectChanges();
      const element = fixture.componentInstance.domElementRef;

      expect(element.querySelector('input[type="text"]').attribute('value')).toEqual('foo');
    });
  });

  describe(`disabled`, () => {
    it(`should add a disabled attribute`, () => {
      const fixture = TestingComponent.create(
        `<ng-playbook-component #component
          [value]="'foo'"
          [disabled]="true"></ng-playbook-component>`);
      fixture.detectChanges();
      const element = fixture.componentInstance.domElementRef;

      expect(element.querySelector('input[type="text"]').attribute('disabled')).toBeTruthy();
    });
  });

  describe(`valueChanges`, () => {
    it(`should emit on each typed character`, fakeAsync(() => {
      const fixture = TestingComponent.create();
      let value = '';
      fixture.componentInstance.component.valueChanges.subscribe(
        (val) => {
          value = value + val;
debugger;
        }
      );

      const elem = fixture.componentInstance.domElementRef.querySelector('input');
      elem.elementRef.nativeElement.value = 'bar'
      //elem.dispatchEvent('change', { target: { value: 'b' }});
      //elem.dispatchEvent('change', { target: { value: 'ba' }});
      elem.dispatchKeyEvent('keydown', R);
      elem.dispatchKeyEvent('keypress', R);
      elem.dispatchKeyEvent('keyup', R);
      /*
      elem.dispatchKeyEvent('keyup', A);
      elem.dispatchKeyEvent('keyup', R);
      */
      expect(value).toEqual('bar');
    }));
  });

});
