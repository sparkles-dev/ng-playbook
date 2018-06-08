import { Component, ViewChild, ElementRef } from '@angular/core';
import { DomElementRef } from '@ng-playbook/testing';
import { DirectiveDirective } from './directive.directive';
import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

@Component({
  template: `<div #directive ngPlaybookDirective></div>`
})
class TestingComponent {
  @ViewChild('directive') public directive: DirectiveDirective;

  @ViewChild('directive', { read: ElementRef })
  public elementRef: ElementRef;

  public get domElementRef(): DomElementRef {
    return new DomElementRef(this.elementRef);
  }

  static create(template?: string) {
    if (template) {
      TestBed.overrideTemplate(TestingComponent, template);
    }

    return TestBed.createComponent(TestingComponent);
  }
}

describe('DirectiveDirective (integration testing)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [DirectiveDirective, TestingComponent]
    });
  });

  it(`should add the ".foobar" css class`, () => {
    const fixture = TestingComponent.create();
    fixture.detectChanges();
    const element = fixture.componentInstance.domElementRef;

    expect(element.hasClass('foobar')).toEqual(true);
  });
});
