import { Component, OnInit, ViewEncapsulation,ViewChild ,ElementRef} from '@angular/core';
import { LocationService } from '../../../services/location.service';
import { firstValueFrom } from 'rxjs';
import { FlightService } from '../../../services/flight.service';
import { DatePipe } from '@angular/common';
import { DialogMode, DialogService, DialogSize } from '../../../../common/service/dialog.service';
import { FlightdetailComponent } from './flightdetail/flightdetail.component';
import { BookingdetailComponent } from './booking/bookingdetail/bookingdetail.component';
declare const FlyonUI: any;
interface FlightItem {
  a_houns: any;
  a_rthouns: any;
  b_houns: any;
  b_rthouns: any;
  a_day: any;
  b_day: any;
  a_rtday: any;
  b_rtday: any;
  arrivalTime: any;
  departureTime: any;
  rtdepartureTime:any;
  rtarrivalTime:any;
  a_houns_rtflight: any;
  a_houns_flight_rtformatted: any;
  a_houns_flight: any;
  a_houns_flight_formatted: any;
  f_price: any;
}
interface Loaction {
  locationId: number;
  name: string;
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
  public listCompany:any[]=[]
  public currentPage = 1;
  public itemsPerPage = 5;
  public hasMoreData = true;  
  public currentIndex = 0;

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
  @ViewChild('slidesContainer') slidesContainer!: ElementRef<HTMLDivElement>;
  constructor(
    public locationService: LocationService,
    public flightService: FlightService,
    private datePipe: DatePipe,
    public dialogService: DialogService,
  ) { }

  async getData() {
    this.isLoading = true;
    const resLocation = await this.locationService.getAllItems().firstValueFrom();
    this.listCompany = resLocation.map((item:Loaction) => ({
      label: item.name,
      value: item.locationId
    }));
    this.listOfData = resLocation;
    const resLocationPrice = await firstValueFrom(this.flightService.getItemsWithPagination(this.currentPage, this.itemsPerPage));
    if (resLocationPrice.content && Array.isArray(resLocationPrice.content)) {
      if (resLocationPrice.content.length < this.itemsPerPage) {
        this.hasMoreData = false; 
      }

      resLocationPrice.content.forEach((item: FlightItem) => {
        item.a_houns = this.datePipe.transform(item.arrivalTime, 'HH:mm', '+07:00');
        item.b_houns = this.datePipe.transform(item.departureTime, 'HH:mm', '+07:00');
        item.a_day = this.convertDateToTextFormat(item.arrivalTime);
        item.b_day = this.convertDateToTextFormat(item.departureTime);

        const a_houns_in_minutes = this.convertToMinutes(item.a_houns);
        const b_houns_in_minutes = this.convertToMinutes(item.b_houns);
        item.a_houns_flight = a_houns_in_minutes - b_houns_in_minutes;
        item.a_houns_flight_formatted = this.convertMinutesToTime(item.a_houns_flight);

      if (item.rtdepartureTime && item.rtarrivalTime) {
      item.b_rthouns = this.datePipe.transform(item.rtdepartureTime, 'HH:mm', '+07:00');
      item.a_rthouns = this.datePipe.transform(item.rtarrivalTime, 'HH:mm', '+07:00');
      item.a_rtday = this.convertDateToTextFormat(item.rtarrivalTime);
      item.b_rtday = this.convertDateToTextFormat(item.rtdepartureTime);
      
      const rta_houns_in_minutes = this.convertToMinutes(item.a_rthouns);
      const rtb_houns_in_minutes = this.convertToMinutes(item.b_rthouns);
      item.a_houns_rtflight = rta_houns_in_minutes - rtb_houns_in_minutes;
      item.a_houns_flight_rtformatted = this.convertMinutesToTime(item.a_houns_rtflight);
      } else {
        item.a_rthouns = null;
        item.b_rthouns = null;
        item.a_rtday = null;
        item.b_rtday = null;
        item.a_houns_rtflight = 0;
        item.a_houns_flight_rtformatted = '00:00';
      }
      });

      this.listOfPrice = [...this.listOfPrice, ...resLocationPrice.content];
      console.log(this.listOfPrice)
    } else {
      this.hasMoreData = false; 
    }
    this.isLoading = false;
  }

  loadMore() {
    if (this.hasMoreData) {
      this.currentPage++;  
      this.getData();  
    }
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

  moveSlide(step: number): void {
    const slides = this.slidesContainer.nativeElement;
    const totalSlides = this.listOfData.length;
    const itemsVisible = 5; 

    const maxIndex = totalSlides - itemsVisible;
    
    this.currentIndex = Math.min(Math.max(this.currentIndex + step, 0), maxIndex);

    const translatePercentage = (this.currentIndex * (100 / itemsVisible));
    slides.style.transform = `translateX(-${translatePercentage}%)`;
  }

  openHandelDialog(mode: string = DialogMode.view, item: any = null) {
    const dialog = this.dialogService.openDialog(
      async (option) => {
        option.title = 'Xem thông tin Vé';
        option.size = DialogSize.medium;
        option.component = FlightdetailComponent;
        option.inputs = {
          mode: mode,
          id: item?.flightId,
          item: item,
          listItem: this.listOfPrice,
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

  openHandelDialogSearch(mode: string = DialogMode.add, item: any = null) {
    const dialog = this.dialogService.openDialog(
      async (option) => {
        option.title = 'Danh sách chuyến bay';
        option.size = DialogSize.tab;
        option.component = BookingdetailComponent;
        option.inputs = {
          mode: mode,
          id: item?.flightId,
          listItem: this.listOfPrice,
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
