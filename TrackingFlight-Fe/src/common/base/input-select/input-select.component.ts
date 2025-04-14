import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-select',
  standalone: false,
  
  templateUrl: './input-select.component.html',
  styleUrl: './input-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true
    }
  ]
})
export class InputSelectComponent implements OnInit, ControlValueAccessor {

  @Input() allowClear: boolean = false;
  @Input() allowSearch: boolean = false;
  @Input() hidden: boolean = false;
  @Input() disabled: boolean = false;
  public controlValue: string | null = null;
  @Input() placeholder: string = '';
  @Input() items: any[] = [];

  eventBaseChange = (_: any) => { };
  eventBaseTouched = () => { };

  ngOnInit(): void {

  }

  onChange(value: any){
    this.controlValue = value;
    this.eventBaseChange(this.controlValue);
  }

  onClear(){
    this.controlValue = null;
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
}
