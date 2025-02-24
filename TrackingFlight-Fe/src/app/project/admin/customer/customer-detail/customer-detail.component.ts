import { Component, Inject, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerDetailService } from '../customer-detail.service';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { DialogService } from '../../../../../common/service/dialog.service';
import { CustomerService } from '../../../../services/customer.service';
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
   public isLoading = false;
   constructor(
     private fb: FormBuilder,
     private shareData: CustomerDetailService,
      private dialogService: DialogService, 
      private customerService: CustomerService,
     @Inject(NZ_MODAL_DATA) public data: any,
   ) {
     this.myForm = shareData.myForm;
   }
   async closeDialog() {
     this.onClose.emit(null);
   }

   ngOnInit(){
    this.shareData.onClose = this.onClose;
    if (this.data.mode === 'view') {
      this.myForm.disable();
      if(this.data.id){
        this.getData();
      }
    }
    if(this.data.mode === 'edit' || this.data.mode === 'add'){
      if(this.data.id){
        this.getData();
      }
      else{
       this.myForm.reset();
      }
      this.myForm.enable();
    }
    
  }

  async getData() {
    const s =  await firstValueFrom(this.customerService.getItem(this.data.id));
    this.myForm.patchValue(s);
  }
 
   async saveData() {
       if(this.data.mode === 'add'){
            this.isLoading = true;
            let shareData = this.myForm.getRawValue();
            const body = shareData;
            const staffadd = await firstValueFrom(this.customerService.saveWithImage(body));
            this.dialogService.closeLoading();
            this.shareData.hasSaveData = staffadd;
            setTimeout(() => {
              this.isLoading = false;
            }, 1000);
            this.closeDialog();
          }
          if(this.data.mode === 'edit'){
            this.isLoading = true;
            let shareData = this.myForm.getRawValue();
            const body = shareData;
            const customeredit = await firstValueFrom(this.customerService.updateWithImage(this.data.id,body));
            this.dialogService.closeLoading();
            this.shareData.hasSaveData = customeredit;
            setTimeout(() => {
              this.isLoading = false;
            }, 1000);
    
            this.closeDialog();
          }
   }

}
