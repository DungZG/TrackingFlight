import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LocationService } from '../../../services/location.service';
import { firstValueFrom } from 'rxjs';
import { FlightService } from '../../../services/flight.service';
import { DatePipe } from '@angular/common';
import { DialogMode, DialogService, DialogSize } from '../../../../common/service/dialog.service';
import { FlightdetailComponent } from './flightdetail/flightdetail.component';

interface FlightItem {
  a_houns: any;
  b_houns: any;
  a_day: any;
  b_day: any;
  a_date_Time: any;
  d_date_Time: any;
  a_houns_flight: any;
  a_houns_flight_formatted: any;
}

@Component({
  selector: 'app-flight-ticket',
  standalone: false,
  templateUrl: './flight-ticket.component.html',
  styleUrl: './flight-ticket.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class FlightTicketComponent implements OnInit {
  public effect = 'scrollx';
  public isLoading = false;
  public listOfData: any;
  public listOfPrice: any[] =[];
  public currentPage = 1;
  public itemsPerPage = 3;
  public hasMoreData = true;  
  public list: any = [
    {
      locationPicture: '../../../asset/2600X1111_chao_he_vie.jpg'
    },
    {
      locationPicture: '../../../asset/top_2x(1).jpg'
    },
    {
      locationPicture: '../../../asset/top_2x.jpg'
    },
  ];

  constructor(
    public locationService: LocationService,
    public flightService: FlightService,
    private datePipe: DatePipe,
    public dialogService: DialogService,
  ) { }

  // Lấy dữ liệu cho trang hiện tại và thêm vào listOfPrice
  async getData() {
    this.isLoading = true;
    const resLocation = await firstValueFrom(this.locationService.getAllItems());
    this.listOfData = resLocation;

    const resLocationPrice = await firstValueFrom(this.flightService.getItemsWithPagination(this.currentPage, this.itemsPerPage));
    
    
    resLocationPrice.content.forEach((item: FlightItem) => {
      item.a_houns = this.datePipe.transform(item.a_date_Time, 'HH:mm');
      item.b_houns = this.datePipe.transform(item.d_date_Time, 'HH:mm');
      item.a_day = this.convertDateToTextFormat(item.a_date_Time);
      item.b_day = this.convertDateToTextFormat(item.d_date_Time);

      const a_houns_in_minutes = this.convertToMinutes(item.a_houns);
      const b_houns_in_minutes = this.convertToMinutes(item.b_houns);
      item.a_houns_flight = b_houns_in_minutes - a_houns_in_minutes;
      item.a_houns_flight_formatted = this.convertMinutesToTime(item.a_houns_flight);
    });
    this.listOfPrice = [...this.listOfPrice, ...resLocationPrice.content];

    this.isLoading = false;
  }

  
  loadMore() {
    this.currentPage++;  
    this.getData();  
  }

  
  goToFirstPage() {
    this.currentPage = 1;  
    this.listOfPrice = [];  
    this.hasMoreData = true; 
    this.getData();  
  }

  ngOnInit(): void {
    this.getData();  
  }

 
  openHandelDialog(mode: string = DialogMode.add, item: any = null) {
    const dialog = this.dialogService.openDialog(
      async (option) => {
        option.title = mode === DialogMode.view ? 'Xem thông tin Vé' : 'Xem thông tin Vé';
        if (mode === DialogMode.edit) {
          option.title = 'Cập nhật thông tin Nhân Viên';
        }
        option.size = DialogSize.xlarge;
        option.component = FlightdetailComponent;
        option.inputs = {
          mode: mode,
          id: item?.staffCode,
          listItem: this.listOfData,
        };
      },
      (eventName, eventValue) => {
        if (eventName === 'onClose') {
          this.dialogService.closeDialogById(dialog.id);
        }
        if (eventValue) {
          this.getData();
        }
      }
    );
  }

  convertToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  convertMinutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    let timeString = '';
    if (hours > 0) {
      timeString += `${hours}h`;
    }
    if (remainingMinutes > 0) {
      timeString += ` ${remainingMinutes}'`;
    }
    return timeString || '0';
  }

  padZero(time: number): string {
    return time < 10 ? '0' + time : time.toString();
  }

  convertDateToTextFormat(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day} tháng ${month}`;
  }
}
