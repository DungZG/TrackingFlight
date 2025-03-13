import { ExtentionService } from '../../../../../common/service/extention.service';
import { EventEmitter, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { ValidatorExtension } from '../../../../../common/validator-extension';
import {
  DialogMode,
} from '../../../../../common/service/dialog.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
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
      ticketType: [null],
      travelclass: [null],
      from: [null],
      to:  [null],
      dateForm: [null],
      dateTo: [null],
      Passenger: [null]
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
