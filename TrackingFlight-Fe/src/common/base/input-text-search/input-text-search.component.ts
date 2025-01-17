import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-text-search',
  standalone: false,

  templateUrl: './input-text-search.component.html',
  styleUrl: './input-text-search.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextSearchComponent),
      multi: true,
    }]
})
export class InputTextSearchComponent {

  public idElement: string | null = this.generateQuickGuid();
  @Input() placeholder: any = null;
  public controlValue: string | null = null;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() hidden: boolean = false;


  public randomCustom(): number {
    let random = () => crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
    return random();
  }

  generateQuickGuid() {
    return (
      this.randomCustom().toString(36).substring(2, 15) +
      this.randomCustom().toString(36).substring(2, 15)
    );
  }

  onClear(){
    this.controlValue = '';
  }

  search(){

  }
}
