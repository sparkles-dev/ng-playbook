import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[ngPlaybookDirective]'
})
export class DirectiveDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'foobar');
  }
}
