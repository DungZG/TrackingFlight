import { Component, OnInit,Inject,Input } from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { firstValueFrom } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '../../../../../common/service/dialog.service';
import {LocationService} from '../../../../services/location.service'
@Component({
  selector: 'app-flightdetail',
  standalone: false,
  templateUrl: './flightdetail.component.html',
  styleUrls: ['./flightdetail.component.css']
})
export class FlightdetailComponent implements OnInit {
  date:any
  public validateForm: FormGroup;
  public listOfLocation: any[] = [];
  onClose = new EventEmitter<any | null>();
  @Input() items: { label: string, value: any }[] = [];
  constructor(
    public fb:FormBuilder,
    public Loaction:LocationService,
    @Inject(NZ_MODAL_DATA) public data: any,
    
  ) {
    this.validateForm = this.fb.group({
      aircraftCode: [null],
      depatureLocation: [null],
      arrivalLocation:[null],
      arrivaldepature: [null]
    })
   }

  ngOnInit() {
    this.getData();
  }

  async getData(){
    const reslocation = await this.Loaction.getAllItems().firstValueFrom();
    const listOfLocation = reslocation;
    this.items = this.listOfLocation.map(item => ({
      label: item.name,
      value: item.name
    }));
    console.log(this.items)
  }

  async closeDialog(){
    this.onClose.emit(null);
  }

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

}
