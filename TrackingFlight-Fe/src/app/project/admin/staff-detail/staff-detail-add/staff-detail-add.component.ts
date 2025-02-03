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
  selectedValue = null;
  public myForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({

    })
  }
  async closeDialog() {
    this.onClose.emit(null);
  }

  saveData() {

  }
}
