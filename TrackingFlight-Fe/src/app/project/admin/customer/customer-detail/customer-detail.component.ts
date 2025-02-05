import { Component, OnInit } from '@angular/core';
import { EventEmitter, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-customer-detail',
  standalone: false,
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent  {

 onClose = new EventEmitter<any | null>();
   selectedValue = null;
   public myForm: FormGroup;
   constructor(
     private fb: FormBuilder
   ) {
     this.myForm = this.fb.group({
       staffname: [null],
       staffcode: [null],
       staffphone: [null],
       address: [null],
       email:  [null],
       identity: [null],
 
     })
   }
   async closeDialog() {
     this.onClose.emit(null);
   }
 
   saveData() {
 
   }

}
