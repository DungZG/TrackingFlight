import { Component, OnInit,inject } from '@angular/core';
import { FormsModule,FormGroup } from '@angular/forms';
import { DialogMode, } from '../../../../../common/enums/dialog-mode';
import { DialogService, DialogSize } from '../../../../../common/service/dialog.service';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ValidatorExtension } from '../../../../../common/validator-extension';
import { BookingService } from './booking.service';
import { BookingdetailComponent } from './bookingdetail/bookingdetail.component';
import { LocationService } from '../../../../services/location.service';
import { FlightService } from '../../../../services/flight.service';
interface Option {
  label: string;
  value: string;
  age: number;
}
interface Loaction {
  locationId: number;
  name: string;
  locationCode: string;
}
@Component({
  selector: 'app-booking',
  standalone: false,
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})

export class BookingComponent implements OnInit {
  Passenger:any;
  public isLoading:any;
  public listOfData:any;
  public listOfLocation:any [] = [];
  public listOfCodeLocation:any [] =[];
  public listOfFlights:any [] = [];
  radioValue: string = 'One_way';

  public validateForm: FormGroup;
  
  constructor(private shareData: BookingService,
    private flightService:FlightService,
    private dialogService: DialogService,
    private locationService: LocationService
  ) {
    this.validateForm = this.shareData.myForm
   }

  ngOnInit() {
    if(this.validateForm.getRawValue().Oneway == true){
     this.validateForm.get('rtdepartureTime')?.disable
    }
    this.validateForm.get('Passenger')?.setValue(1)
    this.getData();
  }

  async onSearch() {
    const formValue = this.validateForm.value;
    const isRoundTrip = formValue.ticketType === 'Round_trip';
    const params: any = {
      departureLocation: formValue.form,  // id điểm đi
      arrivalLocation: formValue.to,      // id điểm đến
      departureTime: new Date(formValue.departureTime).getTime(),
      isRoundTrip: isRoundTrip,
      page: 0,
      size: 10,
    };

    if (isRoundTrip && formValue.rtdepartureTime) {
      params.returnDepartureTime = new Date(formValue.rtdepartureTime).getTime();
    }

    this.isLoading = true;
    const rsFlight = await this.flightService.search(params).firstValueFrom();
    // this.flightService.searchFlights(params).subscribe({
    //   next: (res) => {
    //     this.listOfFlights = res.content || [];
    //     this.isLoading = false;
    //   },
    //   error: (err) => {
    //     this.isLoading = false;
    //     console.error('Lỗi tìm kiếm chuyến bay', err);
    //   }
    // });
    this.listOfFlights = rsFlight.content
    console.log(this.listOfFlights)
    // this.handlerOpenDialog();
  }

  onTicketTypeChange(value: string): void {
    this.radioValue = value;
    if (value === 'One_way') {
      this.validateForm.get('rtdepartureTime')?.disable();
    } else {
      this.validateForm.get('rtdepartureTime')?.enable();
    }
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

 handlerOpenDialog(mode: string = 'find', item: any = null) {
  const formData = this.validateForm.value;
  const dialog = this.dialogService.openDialog(
    async (option) => {
      option.title = 'Thông Tin Tìm Kiếm';
      option.size = DialogSize.tab;
      option.component = BookingdetailComponent;
      option.inputs = {
        mode: mode,
        formData: formData,
        listOfLocation: this.listOfLocation,
        listOfCodeLocation: this.listOfCodeLocation,
        listOfFlights:this.listOfFlights
      };
    },
    (eventName, eventValue) => {
      if (eventName === 'onClose') {
        this.isLoading = true;
        this.dialogService.closeDialogById(dialog.id);
      }
    }
  );
  }
}
