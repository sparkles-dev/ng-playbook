import { Component, EventEmitter, OnInit, Output, Input, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'ng-playbook-component',
  template: `
    <input #textfield
      type="text"
      [attr.value]="value"
      [placeholder]="placeholder"
      (keyup)="onKeyUp($event)">
  `,
  styles: []
})
export class ComponentComponent implements OnInit, ControlValueAccessor {

  @Input()
  public value: any;

  @Input()
  public set disabled (value: boolean) {
    this._disabled = value;

    if (value === true) {
      this.renderer.setAttribute(this.textfieldElementRef.nativeElement, 'disabled', 'disabled');
    } else {
      this.renderer.removeAttribute(this.textfieldElementRef.nativeElement, 'disabled');
    }
  }

  @Output()
  public valueChanges: EventEmitter<string> = new EventEmitter();

  @ViewChild('textfield')
  textfieldElementRef: ElementRef;

  public _disabled = false;

  constructor(
    private renderer: Renderer2
  ) {}

  ngOnInit() {
  }

  writeValue(obj: any): void {
    throw new Error("Method not implemented.");
  }

  registerOnChange(fn: any): void {
    throw new Error("Method not implemented.");
  }

  registerOnTouched(fn: any): void {
    throw new Error("Method not implemented.");
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onKeyUp(evt: KeyboardEvent) {
debugger;
    this.valueChanges.emit(this.textfieldElementRef.nativeElement.value);
  }

}
