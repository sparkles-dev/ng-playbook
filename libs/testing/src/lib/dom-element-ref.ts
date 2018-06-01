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

  dispatchKeyEvent(type: string, keyCode: number, key?: string): KeyboardEvent {
    const event = document.createEvent('KeyboardEvent') as any;
    const target = this.elementRef.nativeElement;
    // Firefox does not support `initKeyboardEvent`, but supports `initKeyEvent`.
    const initEventFn = (event.initKeyEvent || event.initKeyboardEvent).bind(event);
    const originalPreventDefault = event.preventDefault;

    initEventFn(type, true, true, window, 0, 0, 0, 0, 0, keyCode);

    // Webkit Browsers don't set the keyCode when calling the init function.
    // See related bug https://bugs.webkit.org/show_bug.cgi?id=16735
    Object.defineProperties(event, {
      keyCode: { get: () => keyCode },
      key: { get: () => key },
      target: { get: () => target }
    });

    // IE won't set `defaultPrevented` on synthetic events so we need to do it manually.
    event.preventDefault = function() {
      Object.defineProperty(event, 'defaultPrevented', { get: () => true });
      return originalPreventDefault.apply(this, arguments);
    };

    return target.dispatchEvent(event);
  }

  dispatchEvent(type: string, data: any, canBubble = false, cancelable = true): Event {
    const event = document.createEvent('Event');
    const target = this.elementRef.nativeElement;

    Object.keys(data).forEach(key => {
      Object.defineProperty(event, key, data[key]);
    });

    event.initEvent(type, canBubble, cancelable);

    return target.dispatchEvent(event);
  }
}
