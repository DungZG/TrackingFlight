import { Component, OnInit,inject } from '@angular/core';
import { FormsModule,FormGroup } from '@angular/forms';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ValidatorExtension } from '../../../../../common/validator-extension';
import { BookingService } from './booking.service';
interface Option {
  label: string;
  value: string;
  age: number;
}
@Component({
  selector: 'app-booking',
  standalone: false,
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})

export class BookingComponent implements OnInit {
  Passenger:any;
  radioValue = 'A';
  options: Option[] = [
    
  ];
  public validateForm: FormGroup;
  
  constructor(private shareData: BookingService) {
    this.validateForm = this.shareData.myForm
   }

  ngOnInit() {
    if(this.validateForm.getRawValue().Oneway == true){
     this.validateForm.get('to')?.disable
    }
  }

  getQuarter(date: Date): string {
    const quarter = Math.floor((date.getMonth() + 3) / 3);
    const quarterMapper: Record<string, string> = { 1: '一', 2: '二', 3: '三', 4: '四' };
    return `${quarterMapper[quarter]}季度`;
  }

  compareFun = (o1: Option | string, o2: Option): boolean => {
    if (o1) {
      return typeof o1 === 'string' ? o1 === o2.label : o1.value === o2.value;
    } else {
      return false;
    }
  };
  
}
