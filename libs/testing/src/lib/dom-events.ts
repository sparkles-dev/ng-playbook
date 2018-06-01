/* Partially inspired by ctk testing utilities: https://github.com/angular/material2/tree/5.2.x/src/cdk/testing */

/** Creates a browser MouseEvent with the specified options. */
export function createMouseEvent(type: string, x = 0, y = 0) {
    const event = document.createEvent('MouseEvent');
  
    event.initMouseEvent(type,
      false, /* canBubble */
      false, /* cancelable */
      window, /* view */
      0, /* detail */
      x, /* screenX */
      y, /* screenY */
      x, /* clientX */
      y, /* clientY */
      false, /* ctrlKey */
      false, /* altKey */
      false, /* shiftKey */
      false, /* metaKey */
      0, /* button */
      null /* relatedTarget */);
  
    return event;
  }
  
  /** Creates a browser TouchEvent with the specified pointer coordinates. */
  export function createTouchEvent(type: string, pageX = 0, pageY = 0) {
    // In favor of creating events that work for most of the browsers, the event is created
    // as a basic UI Event. The necessary details for the event will be set manually.
    const event = document.createEvent('UIEvent');
    const touchDetails = {pageX, pageY};
  
    event.initUIEvent(type, true, true, window, 0);
  
    // Most of the browsers don't have a "initTouchEvent" method that can be used to define
    // the touch details.
    Object.defineProperties(event, {
      touches: {value: [touchDetails]}
    });
  
    return event;
  }
  
  /** Dispatches a keydown event from an element. */
  export function createKeyboardEvent(type: string, keyCode: number, target?: Element, key?: string) {
    let event = document.createEvent('KeyboardEvent') as any;
    // Firefox does not support `initKeyboardEvent`, but supports `initKeyEvent`.
    let initEventFn = (event.initKeyEvent || event.initKeyboardEvent).bind(event);
    let originalPreventDefault = event.preventDefault;
  
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
  
    return event;
  }
  
  /** Creates a fake event object with any desired event type. */
  export function createFakeEvent(type: string, canBubble = false, cancelable = true) {
    const event = document.createEvent('Event');
    event.initEvent(type, canBubble, cancelable);
    return event;
  }
  
  /** Utility to dispatch any event on a Node. */
  export function dispatchEvent(node: Node | Window, event: Event): Event {
    node.dispatchEvent(event);
    return event;
  }
  
  /** Shorthand to dispatch a fake event on a specified node. */
  export function dispatchFakeEvent(node: Node | Window, type: string, canBubble?: boolean): Event {
    return dispatchEvent(node, createFakeEvent(type, canBubble));
  }
  
  /** Shorthand to dispatch a keyboard event with a specified key code. */
  export function dispatchKeyboardEvent(node: Node, type: string, keyCode: number, target?: Element):
      KeyboardEvent {
    return dispatchEvent(node, createKeyboardEvent(type, keyCode, target)) as KeyboardEvent;
  }
  
  /** Shorthand to dispatch a mouse event on the specified coordinates. */
  export function dispatchMouseEvent(node: Node, type: string, x = 0, y = 0,
    event = createMouseEvent(type, x, y)): MouseEvent {
    return dispatchEvent(node, event) as MouseEvent;
  }
  
  /** Shorthand to dispatch a touch event on the specified coordinates. */
  export function dispatchTouchEvent(node: Node, type: string, x = 0, y = 0) {
    return dispatchEvent(node, createTouchEvent(type, x, y));
  }
  
  /**
   * Focuses an input, sets its value and dispatches
   * the `input` event, simulating the user typing.
   * @param value Value to be set on the input.
   * @param element Element onto which to set the value.
   */
  export function typeInElement(value: string, element: HTMLInputElement) {
    element.focus();
    element.value = value;
    dispatchFakeEvent(element, 'input');
  }
  
  /**
   * Patches an elements focus and blur methods to emit events consistently and predictably.
   * This is necessary, because some browsers, like IE11, will call the focus handlers asynchronously,
   * while others won't fire them at all if the browser window is not focused.
   */
  export function patchElementFocus(element: HTMLElement) {
    element.focus = () => dispatchFakeEvent(element, 'focus');
    element.blur = () => dispatchFakeEvent(element, 'blur');
  }
  
  /**
   * Gets a RegExp used to detect an angular wrapped error message.
   * See https://github.com/angular/angular/issues/8348
   */
  export function wrappedErrorMessage(e: Error) {
    const escapedMessage = e.message.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
    return new RegExp(escapedMessage);
  }
  