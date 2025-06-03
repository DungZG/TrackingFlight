import { Component, OnInit, ViewEncapsulation,ViewChild ,ElementRef,ChangeDetectorRef} from '@angular/core';

import { LocationService } from '../../../services/location.service';
import { firstValueFrom } from 'rxjs';
import { FlightService } from '../../../services/flight.service';
import { DatePipe,CurrencyPipe,CommonModule } from '@angular/common';
import { DialogMode, DialogService, DialogSize } from '../../../../common/service/dialog.service';
import { FlightdetailComponent } from './flightdetail/flightdetail.component';
import { BookingdetailComponent } from './booking/bookingdetail/bookingdetail.component';
import { ArrowLeft, ArrowRight, Plane, MapPin, CalendarDays, Clock, Star, BookOpen, Smartphone, Loader2, Luggage, ChevronLeft, ChevronRight } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
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

interface Airline {
  name: string;
  logoUrl: string;
}

interface Flight {
  id: string;
  airline: Airline;
  departureTime: string;
  departureDate: string;
  departureLocation: string;
  arrivalTime: string;
  arrivalDate: string;
  arrivalLocation: string;
  duration: string;
  price: number;
  isDirectFlight: boolean;
  type: "one-way" | "round-trip";
  // Round trip details
  returnDepartureTime?: string;
  returnDepartureDate?: string;
  returnDepartureLocation?: string;
  returnArrivalTime?: string;
  returnArrivalDate?: string;
  returnArrivalLocation?: string;
  returnDuration?: string;
}

interface Location {
  id: string;
  name: string;
  imageUrl: string;
}
@Component({
  selector: 'app-flight-ticket',
  standalone: false,
  templateUrl: './flight-ticket.component.html',
  styleUrl: './flight-ticket.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [CurrencyPipe, DatePipe]
})

export class FlightTicketComponent implements OnInit {
  mockTopCarouselImages = [
    { id: "1", src: "../../../asset/2600X1111_chao_he_vie.jpg", alt: "Promotion 1" },
    { id: "2", src: "../../../asset/top_2x(1).jpg", alt: "Promotion 2" },
    { id: "3", src: "../../../asset/top_2x.jpg", alt: "Promotion 3" },
  ];

  mockLocations: Location[] = [
    { id: "loc1", name: "Hà Nội", imageUrl: "../../../asset/hanoi.jpg" },
    { id: "loc2", name: "Đà Nẵng", imageUrl: "../../../asset/hanoi.jpg" },
    { id: "loc3", name: "TP. Hồ Chí Minh", imageUrl: "../../../asset/hanoi.jpg" },
    { id: "loc4", name: "Phú Quốc", imageUrl: "../../../asset/hanoi.jpg" },
    { id: "loc5", name: "Nha Trang", imageUrl: "../../../asset/hanoi.jpg" },
    { id: "loc6", name: "Đà Lạt", imageUrl: "../../../asset/hanoi.jpg" },
  ];

  initialMockFlights: Flight[] = [
    {
      id: "fl1",
      airline: { name: "Vietnam Airlines", logoUrl: "../../../asset/VN.png" },
      departureTime: "08:00",
      departureDate: "15 tháng 7",
      departureLocation: "Hà Nội (HAN)",
      arrivalTime: "10:00",
      arrivalDate: "15 tháng 7",
      arrivalLocation: "Đà Nẵng (DAD)",
      duration: "2h 00m",
      price: 1500000,
      isDirectFlight: true,
      type: "one-way",
    },
    {
      id: "fl2",
      airline: { name: "VietJet Air", logoUrl: "../../../asset/VN.png" },
      departureTime: "14:30",
      departureDate: "18 tháng 7",
      departureLocation: "TP. HCM (SGN)",
      arrivalTime: "16:30",
      arrivalDate: "18 tháng 7",
      arrivalLocation: "Hà Nội (HAN)",
      duration: "2h 00m",
      price: 1200000,
      isDirectFlight: true,
      type: "one-way",
    },
    {
      id: "fl3",
      airline: { name: "Bamboo Airways", logoUrl: "../../../asset/VN.png" },
      departureTime: "10:00",
      departureDate: "20 tháng 7",
      departureLocation: "Hà Nội (HAN)",
      arrivalTime: "12:15",
      arrivalDate: "20 tháng 7",
      arrivalLocation: "TP. HCM (SGN)",
      duration: "2h 15m",
      price: 1800000,
      isDirectFlight: true,
      type: "round-trip",
      returnDepartureTime: "18:00",
      returnDepartureDate: "25 tháng 7",
      returnDepartureLocation: "TP. HCM (SGN)",
      returnArrivalTime: "20:15",
      returnArrivalDate: "25 tháng 7",
      returnArrivalLocation: "Hà Nội (HAN)",
      returnDuration: "2h 15m",
    },
     {
      id: "fl4",
      airline: { name: "Pacific Airlines", logoUrl: "../../../asset/VN.png" },
      departureTime: "09:15",
      departureDate: "22 tháng 7",
      departureLocation: "Đà Nẵng (DAD)",
      arrivalTime: "10:30",
      arrivalDate: "22 tháng 7",
      arrivalLocation: "TP. HCM (SGN)",
      duration: "1h 15m",
      price: 950000,
      isDirectFlight: true,
      type: "one-way",
    },
    {
      id: "fl5",
      airline: { name: "Vietravel Airlines", logoUrl: "../../../asset/VN.png" },
      departureTime: "17:00",
      departureDate: "28 tháng 7",
      departureLocation: "Hà Nội (HAN)",
      arrivalTime: "19:05",
      arrivalDate: "28 tháng 7",
      arrivalLocation: "Phú Quốc (PQC)",
      duration: "2h 05m",
      price: 2100000,
      isDirectFlight: true,
      type: "one-way",
    }
  ];

  flights: Flight[] = [];
    // NG-ZORRO Carousel settings
  dotPosition = 'bottom';
  nzEffect = 'scrollx'; // or 'fade'
  public effect = 'scrollx';
  public isLoading = false;
  public listOfData: any;
  public listOfPrice: any[] =[];
  public listCompany:any[]=[]
  public currentPage = 1;
  public itemsPerPage = 5;
  public hasMoreData = true;  
  public currentIndex = 0;
  public isLoadingMore = false;
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
    private currencyPipe: CurrencyPipe, 
    private cdr: ChangeDetectorRef,
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
    loadInitialFlights(): void {
    this.flights = this.initialMockFlights.slice(0, this.itemsPerPage);
    this.hasMoreData = this.initialMockFlights.length > this.itemsPerPage;
    this.currentPage = 1;
    this.cdr.markForCheck();
  }

  formatPrice(price: number): string {
    return this.currencyPipe.transform(price, 'VND', 'symbol', '1.0-0', 'vi') || '';
  }

  loadMoreFlights(): void {
    this.isLoadingMore = true;
    // Simulate API call
    setTimeout(() => {
      const nextPage = this.currentPage + 1;
      const newFlights = this.initialMockFlights.slice(0, nextPage * this.itemsPerPage);
      this.flights = newFlights;
      this.currentPage = nextPage;
      this.hasMoreData = newFlights.length < this.initialMockFlights.length;
      this.isLoadingMore = false;
      this.cdr.markForCheck();
    }, 1000);
  }

  collapseFlights(): void {
    this.loadInitialFlights();
  }
  
}
