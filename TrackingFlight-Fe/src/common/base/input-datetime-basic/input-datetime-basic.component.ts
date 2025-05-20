import { Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { setHours } from 'date-fns';

@Component({
  selector: 'input-datetime-basic',
  standalone: false,
  templateUrl: './input-datetime-basic.component.html',
  styleUrl: './input-datetime-basic.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDatetimeBasicComponent),
      multi: true,
    }
  ]
})
export class InputDatetimeBasicComponent implements ControlValueAccessor {

  public controlValue: any;
  public controlValueDate: any;
  public disabledDate = (current: Date): boolean => {
    if (!this.disablePastDate) return false;
    return current < new Date(new Date().setHours(0, 0, 0, 0));
  };
  public timeDefaultValue = setHours(new Date(), 0);

  @Input() disabled: boolean = false;
  @Input() disablePastDate: boolean = false;
  @Input() readOnly: boolean = false;
  @Input() hidden: boolean = false;
  @Input() placeholder: string = '';
  @Input() class: string = '';

  eventBaseChange = (_: any) => { };
  eventBaseTouched = () => { };


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

  onChangePicker(value: Date) {
    if(!value) {
      this.eventBaseChange(this.controlValue);
      return;
    };
    this.controlValue = value.toYYYYMMDDHHMM();
    this.eventBaseChange(this.controlValue);
  }
}
