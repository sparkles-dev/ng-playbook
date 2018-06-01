import { ElementRef } from '@angular/core';
import { dispatchKeyboardEvent, typeInElement } from './dom-events';

/**
 * Utility class to query the native DOM element.
 */
export class DomElementRef {

  public readonly nativeElement;

  constructor(
    public readonly elementRef: ElementRef
  ) {
    if (!elementRef.nativeElement) {
      throw new Error(`DomElementRef: Cannot wrap an undefined nativeElement!`);
    }

    this.nativeElement = elementRef.nativeElement;
  }

  get innerHTML(): string {
    return this.elementRef.nativeElement.innerHTML;
  }

  get computedStyle(): CSSStyleDeclaration {
    return window.getComputedStyle(this.elementRef.nativeElement);
  }

  querySelector(selector: string) {
    const result = this.elementRef.nativeElement.querySelector(selector);

    return new DomElementRef(new ElementRef(result));
  }

  attribute(name: string): any {
    return this.elementRef.nativeElement.getAttribute(name);
  }

  hasClass(name: string): boolean {
    return this.elementRef.nativeElement.classList.contains(name);
  }

  dispatchKeyboardEvent(type: string, keyCode: number) {
    return dispatchKeyboardEvent(this.nativeElement, type, keyCode);
  }

  typeIn(value: string) {
    return typeInElement(value, this.nativeElement);
  }
}
