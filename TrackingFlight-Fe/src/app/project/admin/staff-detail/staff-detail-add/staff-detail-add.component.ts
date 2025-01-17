import { Component } from '@angular/core';
import { EventEmitter, Injectable } from '@angular/core';
@Component({
  selector: 'app-staff-detail-add',
  standalone: false,

  templateUrl: './staff-detail-add.component.html',
  styleUrl: './staff-detail-add.component.scss'
})
export class StaffDetailAddComponent {
  onClose = new EventEmitter<any | null>();

  async closeDialog() {
    this.onClose.emit(null);
  }
}
