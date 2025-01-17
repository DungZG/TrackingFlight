import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  standalone: false,
  
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
})
export class InputTextComponent implements ControlValueAccessor{
  
  @Input() disabled: boolean = false;
  @Input() placeholder: string = '';
  @Input() readOnly: boolean = false;
  @Input() hidden: boolean = false;
  public controlValue: any = null;
  @Input() mask?: string;
  @Input() maxlength: number | null = null;

  @Output('onClear') eventOnClear = new EventEmitter<void>();

  eventBaseChange = (_: any) => {};
  eventBaseTouched = () => {};

  public onClear(){
    this.controlValue = '';
    this.eventBaseChange(this.controlValue);
  }

  writeValue(obj: any): void {
    this.controlValue = obj;
  }
  registerOnChange(fn: any): void {
    this.eventBaseChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.eventBaseTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: any){
    this.controlValue = event.target.value;
    this.eventBaseChange(this.controlValue);
  }
}
