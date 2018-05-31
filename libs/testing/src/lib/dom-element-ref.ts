import { ElementRef } from "@angular/core";

/**
 * Utility class to query the native DOM element.
 */
export class DomElementRef {

  constructor(
    public readonly elementRef: ElementRef
  ) {
    if (!elementRef.nativeElement) {
      throw new Error(`DomElementRef: Cannot wrap an undefined nativeElement!`);
    }
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

  get innerHTML(): string {
    return this.elementRef.nativeElement.innerHTML;
  }

  getComputedStyle(): CSSStyleDeclaration {
    return window.getComputedStyle(this.elementRef.nativeElement);
  }
}
