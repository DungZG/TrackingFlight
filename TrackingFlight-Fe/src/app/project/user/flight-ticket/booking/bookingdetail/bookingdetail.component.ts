import { Component, OnInit,Inject } from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { firstValueFrom } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '../../../../../../common/service/dialog.service';
import { DialogMode, DialogSize } from '../../../../../../common/service/dialog.service';
import { FlightdetailComponent } from '../../flightdetail/flightdetail.component';
import { LocationService } from '../../../../../services/location.service';
import { AircraftService } from '../../../../../services/aircraft.service';
import { AirlineService } from '../../../../../services/airline.service';
@Component({
  selector: 'app-bookingdetail',
  standalone: false,
  templateUrl: './bookingdetail.component.html',
  styleUrls: ['./bookingdetail.component.css']
})
export class BookingdetailComponent implements OnInit {
  public listOfData:any;
  public formData: any;
  public listOfLocation: any[] = [];
  public listOfCodeLocation:any [] =[];
  public listOfFlights:any [] = [];
  public listOfAircraft:any []=[];
  public listOfAirline:any []=[];
  onClose = new EventEmitter<any | null>();
  constructor(
    public dialogService: DialogService,
    public locationService:LocationService,
    public aircraftService:AircraftService,
    public airlineService:AirlineService,
    @Inject(NZ_MODAL_DATA) public data: any,
  ) { }

  ngOnInit() {
     this.formData = this.data.formData;
     this.listOfLocation = this.data.listOfLocation;
     this.listOfCodeLocation = this.data.listOfCodeLocation;
     console.log('Dữ liệu nhận được từ form:', this.formData);
     console.log('Danh sách địa điểm:', this.listOfLocation);
     console.log(this.data.listOfFlights.aircraftId);
     this.getData();
     
  }

  async getData(){
    const rsAircraft = await this.aircraftService.getItem(this.data.listOfFlights.aircraftId).firstValueFrom();
    console.log(rsAircraft)
    debugger
  }

  async closeDialog(){
    this.onClose.emit(null);
  }

  openHandelDialog(mode: string = DialogMode.add, item: any = null) {
      const dialog = this.dialogService.openDialog(
        async (option) => {
          option.title = 'Xem thông tin Vé';
          option.size = DialogSize.medium;
          option.component = FlightdetailComponent;
          option.inputs = {
            mode: mode,
            id: item?.flightId,
            listItem: this.listOfData,
          };
        },
        (eventName, eventValue) => {
          if (eventName === 'onClose') {
            this.dialogService.closeDialogById(dialog.id);
          }
          // if (eventValue) {
          //   this.getData();
          // }
        }
      );
    }

}
