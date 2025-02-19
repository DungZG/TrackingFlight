import { ExtentionService } from '../../../../common/service/extention.service';
import { EventEmitter, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder,Validators } from '@angular/forms';
import { ValidatorExtension } from '../../../../common/validator-extension';
import {
  DialogMode,
} from '../../../../common/service/dialog.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerDetailService {
  public id: any;
  mode: string = DialogMode.view;
  onClose = new EventEmitter<any | null>();
  

  myForm: FormGroup;
  hasSaveData: any;
  orgineData: string | null = null;

  constructor(
    private fb: FormBuilder,
  ) {
    this.myForm = this.fb.group({
        ticketname: [null, [Validators.required]],
        flightcode: [null, [Validators.required]],
        flightType: [null, [Validators.required]],
        flightCompany:  [null, [Validators.required]]
    });
  }

  saveOrgine() {
    this.orgineData = JSON.stringify(this.myForm.getRawValue());
  }

  isChange() {
    return JSON.stringify(this.myForm.getRawValue()) !== this.orgineData;
  }

  async closeDialog() {
    this.onClose.emit(this.hasSaveData);
  }

}
