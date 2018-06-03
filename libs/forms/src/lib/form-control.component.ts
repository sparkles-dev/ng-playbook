import { forwardRef, Component, EventEmitter, OnInit, Output, Input, Renderer2, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ng-playbook-form-control',
  template: `
    <input #textfield
      type="text"
      [attr.value]="value"
      [placeholder]="placeholder"
      (focus)="onFocus()"
      (keyup)="onKeyUp($event)">
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useClass: forwardRef(() => FormControlComponent)
    }
  ]
})
export class FormControlComponent implements ControlValueAccessor, OnInit {

  @Input()
  public value: any;

  @Input()
  public set disabled (value: boolean) {
    if (value === true) {
      this.renderer.setAttribute(this.textfieldElementRef.nativeElement, 'disabled', 'disabled');
    } else {
      this.renderer.removeAttribute(this.textfieldElementRef.nativeElement, 'disabled');
    }
  }

  @Output()
  public valueChanges: EventEmitter<string> = new EventEmitter();

  /** @internal */
  @ViewChild('textfield')
  textfieldElementRef: ElementRef;

  private onChange: (_: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(
    private renderer: Renderer2
  ) {}

  ngOnInit() {
  }

  onFocus() {
    this.onTouched();
  }

  onKeyUp(evt: KeyboardEvent) {
    this.notifyValueChange();
  }

  private notifyValueChange() {
    const value = this.textfieldElementRef.nativeElement.value;

    // Update attribute binding
    this.value = value;

    // Emit custom event
    this.valueChanges.emit(value);

    // Notify angular forms API
    this.onChange(value);
  }

  /** @internal */
  writeValue(obj: any): void {
    debugger;
    this.value = obj;
  }

  /** @internal */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /** @internal */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /** @internal */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
