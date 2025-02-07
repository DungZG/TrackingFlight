import { Component } from '@angular/core';
import { EventEmitter, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-staff-detail-add',
  standalone: false,
  templateUrl: './staff-detail-add.component.html',
  styleUrl: './staff-detail-add.component.scss'
})
export class StaffDetailAddComponent {
  onClose = new EventEmitter<any | null>();
  public listRole: any[] = [
    {
      value: 0,
      label: 'Tất cả'
    },
    {
      value: 1,
      label: 'Đang hoạt động'
    },
    {
      value: 2,
      label: 'Ngừng hoạt động'
    },
    {
      value: 3,
      label: 'Tạm ngừng hoạt động'
    },
  ];
  selectedFacility= null;
  selectedGender = null;
  public myForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      staffName: [null],
      staffCode: [null],
      staffPhone: [null],
      staffAddress: [null],
      staffEmail:  [null],
      staffIdentity: [null],
      staffPicture: [null],
    })
  }
  async closeDialog() {
    this.onClose.emit(null);
  }

  saveData() {

  }
}
