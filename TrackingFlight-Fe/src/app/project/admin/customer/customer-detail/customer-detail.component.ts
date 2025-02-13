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
   loading = false;
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
 
   async saveData() {
       if(this.data.mode === 'add'){
            this.loading = true;
            let shareData = this.myForm.getRawValue();
            const body = shareData;
            const staffadd = await firstValueFrom(this.customerService.saveWithImage(body));
            this.dialogService.closeLoading();
            this.loading = false;
            this.shareData.hasSaveData = staffadd;
            this.closeDialog();
          }
          if(this.data.mode === 'edit'){
            this.loading = true;
            let shareData = this.myForm.getRawValue();
            const body = shareData;
            const staffedit = await firstValueFrom(this.customerService.updateWithImage(this.data.id,body));
            this.dialogService.closeLoading();
            this.loading = false;
            this.shareData.hasSaveData = staffedit;
            this.closeDialog();
          }
   }

}
