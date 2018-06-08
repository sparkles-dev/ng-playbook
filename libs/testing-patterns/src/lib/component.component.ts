import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  Renderer2,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'ng-playbook-component',
  template: `
    <input #textfield
      type="text"
      [attr.value]="value"
      [placeholder]="placeholder"
      (keyup)="onKeyUp($event)">
  `
})
export class ComponentComponent implements OnInit {
  @Input() public value: any;

  @Input()
  public set disabled(value: boolean) {
    this._disabled = value;

    if (value === true) {
      this.renderer.setAttribute(
        this.textfieldElementRef.nativeElement,
        'disabled',
        'disabled'
      );
    } else {
      this.renderer.removeAttribute(
        this.textfieldElementRef.nativeElement,
        'disabled'
      );
    }
  }

  @Output() public valueChanges: EventEmitter<string> = new EventEmitter();

  @ViewChild('textfield') textfieldElementRef: ElementRef;

  public _disabled = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {}

  onKeyUp(evt: KeyboardEvent) {
    this.valueChanges.emit(this.textfieldElementRef.nativeElement.value);
  }
}
