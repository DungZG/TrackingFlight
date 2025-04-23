import { Component, OnInit,Inject,Input } from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { firstValueFrom } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '../../../../../common/service/dialog.service';
import {LocationService} from '../../../../services/location.service'
import { AircraftService } from '../../../../services/aircraft.service';
import { FlightService } from '../../../../services/flight.service';
interface Cavity {
  cavityId: number;
  cavityNumber: number;
  cavityClass: string;
  carvityTo: number;
  carvityFrom: number;
  price: number;
}
@Component({
  selector: 'app-flightdetail',
  standalone: false,
  templateUrl: './flightdetail.component.html',
  styleUrls: ['./flightdetail.component.css']
})

export class FlightdetailComponent implements OnInit {
  date:any
  public isLoading: any;
  public listType:any []=[
    { label: 'Khứ Hồi', value: 2 },
    { label: 'Một Chiều', value: 1 },
  ]
  public validateForm: FormGroup;
  public listOfLocation: any[] = [];
  public listCompany: any []=[];
  public listAircraft: any[] = [];
  public listOfData: any[] = [];
  public selectedCavities: any[] = [];
  public status:any []= [
    { label: 'Đang hoạt động', value: 1 },
    { label: 'Tạm Ngưng', value: 2 },
  ];
  public eat = false;
  public bag = false;
  public isRoundTrip: boolean = false;
  onClose = new EventEmitter<any | null>();
  @Input() items: { label: string, value: any }[] = [];
  @Input() itemsAircraft: { label: string, value: any }[] = [];
  constructor(
    public fb:FormBuilder,
    public Loaction:LocationService,
    public Aircraft:AircraftService,
    public flightService:FlightService,
    @Inject(NZ_MODAL_DATA) public data: any,
    
  ) {
    this.validateForm = this.fb.group({
      aircraftId: [{ value: null, disabled: false }],
      departureLocation: [{ value: null, disabled: false }],
      arrivalLocation:[{ value: null, disabled: false }],
      typeFlight:[{ value: null, disabled: false }],
      dateRange: [{ value: null, disabled: false }],
      status:[{ value: null, disabled: false }],
      price: [{ value: null, disabled: false }],
      dateRangeEnd:[{ value: null, disabled: false }],
    })
   }

  ngOnInit() {
    this.getData();
    this.validateForm.get('typeFlight')?.valueChanges.subscribe((value) => {
      this.isRoundTrip = value === 2;
    
      if (!this.isRoundTrip) {
        this.validateForm.get('dateRangeEnd')?.reset();
        this.validateForm.get('dateRangeEnd')?.disable();
      } else {
        this.validateForm.get('dateRangeEnd')?.enable();
      }
    });
    this.validateForm.get('price')?.valueChanges.subscribe(() => {
      const aircraftId = this.validateForm.get('aircraftCode')?.value;
      if (aircraftId) {
        this.onAircraftChange(aircraftId); 
      }
    });
  }

  async getData(){
    this.isLoading = true;
    const resLocation = await this.Loaction.getAllItems().firstValueFrom();
    const resAircraft = await this.Aircraft.getAllItems().firstValueFrom();
    this.listCompany = resLocation;
    this.listAircraft = resAircraft.result;
    this.items = this.listCompany.map(item => ({
      label: item.name,
      value: item.locationId
    }));
    this.itemsAircraft = this.listAircraft.map(item => ({
      label: `${item.aircraftName} - ${item.aircraftCode} - ${item.airline.name}`,
      value: item.aircraftId
    }));
    this.isLoading = false;
  }

  async onSelectAircraft(aircraftId: number) {
    const aircraft = this.listAircraft.find(a => a.aircraftId === aircraftId);
    if (aircraft) {
      this.selectedCavities = aircraft.cavityList.map((cavity: Cavity) => ({
        ...cavity,
        seatCount: cavity.carvityFrom - cavity.carvityTo + 1,
        calculatedPrice: cavity.price + this.validateForm.value.price || 0
      }));
    }
  }

  onAircraftChange(aircraftId: number): void {
    const aircraft = this.listAircraft.find(a => a.aircraftId === aircraftId);
    const flightCost = Number(this.validateForm.get('price')?.value || 0); 
    if (aircraft && aircraft.cavityList) {
      this.selectedCavities = aircraft.cavityList.map((cavity:Cavity) => {
        const cavityPrice = Number(cavity.price || 0); 
        return {
          ...cavity,
          seatCount: cavity.carvityFrom - cavity.carvityTo + 1,
          calculatedPrice: cavityPrice + flightCost
        };
      });
    } else {
      this.selectedCavities = [];
    }
  }

  onCostChange(): void {
    const flightCost = Number(this.validateForm.value.price || 0);
    this.selectedCavities = this.selectedCavities.map(cavity => ({
      ...cavity,
      calculatedPrice: cavity.price + flightCost
    }));
  }

  async onSubmit() {
    const aircraftId = this.validateForm.value.aircraftId;
    const selectedAircraft = this.listAircraft.find(a => a.aircraftId === aircraftId);
  
    const payload = {
      airlineId: selectedAircraft?.airline.airlineId, 
      aircraftId: aircraftId,
      departureLocation: this.validateForm.value.departureLocation,
      arrivalLocation: this.validateForm.value.arrivalLocation,
      departureTime: this.validateForm.value.dateRange[0],
      arrivalTime: this.validateForm.value.dateRange[1],
      price: this.validateForm.value.price,
      status: 1
    };
    debugger
    this.isLoading = true;
    await this.flightService.saveWithRawData(payload).firstValueFrom();
    this.isLoading = false;
    this.onClose.emit();
  }

  async closeDialog(){
    this.onClose.emit(null);
  }

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

}
