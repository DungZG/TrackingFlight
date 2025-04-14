import { Component, OnInit,Inject,Input } from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { firstValueFrom } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '../../../../../../common/service/dialog.service';
@Component({
  selector: 'app-aircraftcontainer',
  standalone: false,
  templateUrl: './aircraftcontainer.component.html',
  styleUrls: ['./aircraftcontainer.component.css']
})
export class AircraftcontainerComponent implements OnInit {
  onClose = new EventEmitter<any | null>();
  public validateForm: FormGroup;
  public cavityClass:any []= [
    { label: 'Economy Class', value: 'Economy Class' },
    { label: 'Business Class', value: 'Business Class' },
    { label: 'First Class', value: 'First Class' }
  ];
  @Input() item: any;
  @Input() mode: string = 'add';
  @Input() index: number | null = null;
  public cabinList: any[] = [];
  constructor(
    private fb:FormBuilder,

  ) { 
    this.validateForm = this.fb.group({
      tankage: [null],
      cavityTo: [{ value: null, disabled: false }],
      cavityFrom: [{ value: null, disabled: false }],
      cavityClass: [{ value: null, disabled: false }],
      cavityNumber: [{ value: null, disabled: false }],
      price: [{ value: null, disabled: false }]
    });
  }

  ngOnInit():void {
    if (this.mode === 'edit' && this.item) {
      this.validateForm.patchValue({
        cavityNumber: this.item.cavityNumber,
        cavityClass: this.item.cavityClass,
        cavityTo: this.item.cavityTo,
        cavityFrom: this.item.cavityFrom,
        price: this.item.price,
        tankage: this.item.tankage ?? null
      });
    }
  }

  async closeDialog(){
    this.onClose.emit(null);
  }

  async saveData() {
    if (this.validateForm.valid) {
      const formData = this.validateForm.value;
      this.onClose.emit(formData);
    }
  }

}
