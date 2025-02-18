import { Component,Inject,Input,OnDestroy,
  OnInit,
  Output, } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogMode,DialogService, DialogSize } from '../../../../../common/service/dialog.service';
import { StaffDetailService } from '../staff-detail.service';
import {StaffService} from '../../../../services/staff.service';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-staff-detail-add',
  standalone: false,
  templateUrl: './staff-detail-add.component.html',
  styleUrl: './staff-detail-add.component.scss'
})
export class StaffDetailAddComponent implements OnInit, OnDestroy {
  @Input() id: any;
  @Input() listItem: any;
  onClose = new EventEmitter<any | null>();
  staffPicture: any;
  loading = false;
  public isLoading = false;
  public listRole: any[] = [
    {
      value: 0,
      label: 'Nhân Viên'
    },
    {
      value: 1,
      label: 'Quản Lý'
    },
    {
      value: 2,
      label: 'Admin'
    },
  ];
  public listGender: any[] = [
    {
      value: 0,
      label: 'Nam'
    },
    {
      value: 1,
      label: 'Nữ'
    },
  ];
  public listFacility: any[] = [
    {
      value: 0,
      label: 'Hà Nội'
    },
    {
      value: 1,
      label: 'Hồ Chí Minh'
    },
    {
      value: 2,
      label: 'Đà Nẵng'
    },
  ];
  selectedFacility= null;
  selectedGender = null;
  selectedImage: File | null = null;
  public myForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private shareData: StaffDetailService,
    private staffService: StaffService,
    private dialogService: DialogService,
    @Inject(NZ_MODAL_DATA) public data: any,
  ) {
    this.myForm = shareData.myForm;
  }

  async closeDialog() {
    this.shareData.closeDialog();
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
      this.myForm.enable();
    }
  }

  async getData() {
    const s =  await firstValueFrom(this.staffService.getItem(this.data.id));
    this.myForm.patchValue(s);
  }

  ngOnDestroy(): void {
    this.myForm.reset();
    this.myForm.enable();
  }

  async saveData() {
    debugger
    this.loading = true;
    let shareData = this.myForm.getRawValue(); 
  
    const file = this.myForm.get('staffPicture')?.value;
  
    if (file) {
      shareData.staffPicture = await this.convertFileToByteArray(file);
    }
    
    try {
      let response;
      if (this.data.mode === 'add') {
        response = await firstValueFrom(this.staffService.saveWithImage(shareData));
      } else if (this.data.mode === 'edit') {
        response = await firstValueFrom(this.staffService.updateWithImage(this.data.id, shareData));
      }
  
      this.dialogService.closeLoading();
      this.loading = false;
      this.shareData.hasSaveData = response;
      this.closeDialog();
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
      this.loading = false;
      this.closeDialog();
    }
  }
  
  convertFileToByteArray(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function(event) {
        const byteArray = new Uint8Array(event.target?.result as ArrayBuffer);
        resolve(byteArray);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }
  
}
