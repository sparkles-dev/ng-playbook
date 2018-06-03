import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { TestBed, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DomElementRef } from '@ng-playbook/testing';
import { FormControlComponent } from './form-control.component';

@Component({
  template: `<ng-playbook-form-control></ng-playbook-form-control>`
})
class TestingComponent {

  @ViewChild(FormControlComponent, { read: FormControlComponent })
  public formControl: FormControlComponent

  @ViewChild(FormControlComponent, { read: ElementRef })
  public formElementRef: ElementRef

  public get domElementRef(): DomElementRef {
    return new DomElementRef(this.formElementRef);
  }

  static create(template?: string) {
    if (template) {
      TestBed.overrideTemplate(TestingComponent, template);
    }

    return TestBed.createComponent(TestingComponent);
  }
}

describe(`FormControlComponent`, () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule
      ],
      declarations: [
        FormControlComponent,
        TestingComponent
      ]
    });
  });

  it(`should create`, () => {
    const fixture = TestingComponent.create();
    expect(fixture.componentInstance.formControl).toBeDefined();
  });

  describe(`Template-Driven Forms`, () => {

    let fixture: ComponentFixture<FormTestingComponent>;
    beforeEach((done) => {
      TestBed.resetTestingModule()
        .configureTestingModule({
          imports: [
            CommonModule,
            FormsModule
          ],
          declarations: [
            FormControlComponent,
            FormTestingComponent
          ]
        });

      fixture = TestBed.createComponent(FormTestingComponent);
      fixture.detectChanges();

      done();
    });

    @Component({
      template: `
        <form #form="ngForm">
          <ng-playbook-form-control #control [(ngModel)]="model" name="xyz"></ng-playbook-form-control>
        </form>
      `
    })
    class FormTestingComponent {
      model = '123';

      @ViewChild('control', { read: FormControlComponent })
      public formControl: FormControlComponent

      @ViewChild('control', { read: ElementRef })
      public formElementRef: ElementRef

      public get domElementRef(): DomElementRef {
        return new DomElementRef(this.formElementRef);
      }
    }

    it(`should integrate with ngModel`, fakeAsync(() => {
      // Non-working stuff:
      // fixture.whenRenderingDone().then(() => { });
      // fixture.whenStable().then(() => { });

      debugger;
      expect(fixture.componentInstance.formControl.value).toEqual('foo');
      expect(fixture.componentInstance.domElementRef.querySelector('input').attribute('value')).toEqual('foo');

    }));
  });

  xdescribe(`Reactive Forms`, () => {
    xit(`should integrate with ngModel`, () => {
      const fixture = TestingComponent.create(`
        <form ngForm>
          <ng-playbook-form-control [(ngModel)]="foo"></ng-playbook-form-control>
        </form>
      `);

    });
  });

});
