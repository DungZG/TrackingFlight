import { Component, OnInit,Inject,Input } from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { firstValueFrom } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '../../../../../common/service/dialog.service';
import {LocationService} from '../../../../services/location.service'
import { AircraftService } from '../../../../services/aircraft.service';
@Component({
  selector: 'app-flightdetail',
  standalone: false,
  templateUrl: './flightdetail.component.html',
  styleUrls: ['./flightdetail.component.css']
})
export class FlightdetailComponent implements OnInit {
  date:any
  public isLoading: any;
  public validateForm: FormGroup;
  public listOfLocation: any[] = [];
  public listCompany: any []=[];
  public listAircraft: any[] = [];
  onClose = new EventEmitter<any | null>();
  @Input() items: { label: string, value: any }[] = [];
  @Input() itemsAircraft: { label: string, value: any }[] = [];
  constructor(
    public fb:FormBuilder,
    public Loaction:LocationService,
    public Aircraft:AircraftService,
    @Inject(NZ_MODAL_DATA) public data: any,
    
  ) {
    this.validateForm = this.fb.group({
      aircraftCode: [{ value: null, disabled: false }],
      depatureLocation: [{ value: null, disabled: false }],
      arrivalLocation:[{ value: null, disabled: false }],
      arrivaldepature: [{ value: null, disabled: false }]
    })
   }

  ngOnInit() {
    this.getData();
  }

  async getData(){
    this.isLoading = true;
    const resLocation = await this.Loaction.getAllItems().firstValueFrom();
    const resAircraft = await this.Aircraft.getAllItems().firstValueFrom();
    this.listCompany = resLocation;
    this.listAircraft = resAircraft.result;
    debugger
    this.items = this.listCompany.map(item => ({
      label: item.name,
      value: item.locationId
    }));
    this.itemsAircraft = this.listAircraft.map(item => ({
      label: item.aircraftName,
      value: item.aircraftId
    }))
    this.isLoading = false;
  }

  async closeDialog(){
    this.onClose.emit(null);
  }

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

}
