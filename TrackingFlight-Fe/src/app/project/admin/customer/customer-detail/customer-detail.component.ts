import { Component, OnInit } from '@angular/core';
import { EventEmitter, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerDetailService } from '../customer-detail.service';
@Component({
  selector: 'app-customer-detail',
  standalone: false,
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent  {
  public listType: any[] = [
    
  ];
  onClose = new EventEmitter<any | null>();
   selectedValue = null;
   public myForm: FormGroup;
   constructor(
     private fb: FormBuilder,
     private shareData: CustomerDetailService
   ) {
     this.myForm = shareData.myForm;
   }
   async closeDialog() {
     this.onClose.emit(null);
   }
 
   saveData() {
 
   }

}
