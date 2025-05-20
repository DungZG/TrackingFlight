import { Component, OnInit,Inject,EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { LocationService } from '../../../../services/location.service';
import { FlightService } from '../../../../services/flight.service';
import { PaymentDetailService } from '../payment.service';
interface Loaction{
  name: string,
  locationId: number,
  locationCode: string,
}
@Component({
  selector: 'app-payment-flightdetail',
  standalone: false,
  templateUrl: './payment-flightdetail.component.html',
  styleUrls: ['./payment-flightdetail.component.css']
})
export class PaymentFlightdetailComponent implements OnInit {
  onClose = new EventEmitter<any | null>();
  public item:any;
  public listOfLocation: any []=[];
  public listOfCodeLocation: any []=[];
  public listType:any []=[
    { label: 'Khứ Hồi', value: 2 },
    { label: 'Một Chiều', value: 1 },
  ];
  public totalPrice: number;
  public isLoading = false;
  constructor(
    public locationService: LocationService,
    public flightService : FlightService,
    public shareData:PaymentDetailService,
    @Inject(NZ_MODAL_DATA) public data: any,
  ) { 
    
  }

  ngOnInit() {
    this.shareData.onClose = this.onClose;
    this.getData()
    console.log(this.data.item)
    console.log(this.data.totalPrice)
  }

  async getData(){
    this.isLoading = true;
    const resLocation = await this.locationService.getAllItems().firstValueFrom();
    this.isLoading = false;
    this.listOfLocation = resLocation.map((item:Loaction) => ({
      label: item.name,
      value: item.locationId
    }));
    this.listOfCodeLocation = resLocation.map((item:Loaction) => ({
      label: item.locationCode,
      value: item.locationId
    }));
  }

  async closeDialog(){
    this.shareData.closeDialog()
  }

}
