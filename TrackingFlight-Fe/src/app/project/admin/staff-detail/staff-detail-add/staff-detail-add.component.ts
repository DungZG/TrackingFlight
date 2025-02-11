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
