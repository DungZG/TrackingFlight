import { Component, OnInit } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';
import { FlightService } from '../../../services/flight.service';
import { LocationService } from '../../../services/location.service';
import { DialogService, DialogMode, DialogSize } from '../../../../common/service/dialog.service';
import { FlightdetailComponent } from '../flight-ticket/flightdetail/flightdetail.component';
import { PaymentFlightdetailComponent } from './payment-flightdetail/payment-flightdetail.component';

interface SeatInfo {
  id: string;
  type: 'First Class' | 'Economy Class' | 'Business Class';
  status: 'available' | 'occupied' | 'selected';
  position: 'window' | 'middle' | 'aisle';
  price:number,
}

interface Location {
  name: string,
  locationId: number,
  locationCode: string,
}

interface Cavity{
  start:number,
  end:number,
  carvityFrom:number,
  carvityTo:number,
  cavityClass:string,
  price:number
}

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public checked: any = false;
  public seatData: any;
  public selectedFlight: any;
  public isLoading: any = false;
  public listOfLocation: any[] = [];
  public listOfCodeLocation: any[] = [];
  public listType: any[] = [
    { label: 'Khứ Hồi', value: 2 },
    { label: 'Một Chiều', value: 1 },
  ];
  public userInfo: any = {
    name: '',
    gender: '',
    email: '',
    sdt: ''
  };;
  public isFlexibleTicket: boolean = false;  // Biến để theo dõi loại vé linh hoạt
  public totalPrice: number;  // Biến lưu trữ giá vé cập nhật
  // Lấy số hàng ghế dựa trên tankage (mỗi hàng 5 ghế)
  public rows: number[] = [];
  public leftSection = ['A', 'B'];
  public middleSection = ['C', 'D', 'E'];
  public rightSection = ['F', 'G'];

  public seatMap: { [key: string]: SeatInfo } = {};
  public selectedSeats: string[] = [];
  constructor(
    public dialogService: DialogService,
    private modalService: NzModalService,
    private flightService: FlightService,
    private locationService: LocationService,
  ) { 
    this.initializeSeatMap();
  }

  ngOnInit(): void {
    this.getData();
    this.totalPrice = this.selectedFlight.price; 
  }

  ngOnChanges(): void {
    
  }

  // Lấy dữ liệu chuyến bay và địa điểm
  async getData() {
    this.isLoading = true;
    this.selectedFlight = this.flightService.getSelectedFlight();
    console.log(this.selectedFlight)
    const resLocation = await this.locationService.getAllItems().firstValueFrom();
    this.isLoading = false;
    this.listOfLocation = resLocation.map((item: Location) => ({
      label: item.name,
      value: item.locationId
    }));
    this.listOfCodeLocation = resLocation.map((item: Location) => ({
      label: item.locationCode,
      value: item.locationId
    }));
    const totalSeats = this.selectedFlight.aircraft.tankage;
    this.rows = Array.from({ length: Math.floor(totalSeats / 5) }, (_, i) => i + 1);
  }

  private initializeSeatMap() {
    this.selectedFlight = this.flightService.getSelectedFlight();
    this.selectedFlight.aircraft.cavityList.forEach((cavity: Cavity) => {
      const start = cavity.carvityFrom;
      const end = cavity.carvityTo;
      let rowStart = Math.min(start, end);
      let rowEnd = Math.max(start, end);
      // Tạo ghế cho mỗi khoang
      for (let row = rowStart; row <= rowEnd; row++) {
        [...this.leftSection, ...this.middleSection, ...this.rightSection].forEach(col => {
          const seatId = `${col}${row}`;
          this.seatMap[seatId] = {
            id: seatId,
            type: cavity.cavityClass as 'First Class' | 'Economy Class' | 'Business Class',
            price: cavity.price,
            status: 'available',
            position: this.getSeatPosition(col)
          };
        });
      }
    });
  }

  private getSeatPosition(col: string): 'window' | 'middle' | 'aisle' {
    if (['A', 'G'].includes(col)) return 'window';
    if (['B', 'C', 'E', 'F'].includes(col)) return 'aisle';
    return 'middle';
  }

  isEmergencyExit(row: number): boolean {
    return row === 14 || row === 15;
  }

  isLavatory(row: number): boolean {
    return row === 1 || row === 30;
  }

  onSeatSelect(seatId: string) {
    if (this.seatMap[seatId].status === 'occupied') return; 
    if (this.selectedSeats.includes(seatId)) {
      this.selectedSeats = this.selectedSeats.filter(id => id !== seatId);
      this.seatMap[seatId].status = 'available'; 
    } else {
      this.selectedSeats.push(seatId);
      this.seatMap[seatId].status = 'selected';  
    }
    this.seatData = this.selectedSeats;
  //console.log(this.seatData)
  }

  // Hàm khi chọn "Vé linh hoạt"
  toggleFlexibleTicket(): void {
    this.isFlexibleTicket = !this.isFlexibleTicket;
    if (this.isFlexibleTicket) {
      this.totalPrice = this.selectedFlight.price * 1.1;
    } else {
      this.totalPrice = this.selectedFlight.price;
    }
  }

  updateTotalPrice(): void {
    if (this.checked) {
      this.totalPrice = this.selectedFlight.price + 244136.60;
    } else {
      this.totalPrice = this.selectedFlight.price;
    }
  }

  current = 0;
  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
    this.toggleFlexibleTicket()
    debugger
  }

  done(): void {
    console.log('done');
  }

  openHandelDialog(mode: string = DialogMode.add, item: any = null): void {
    const dialog: NzModalRef = this.modalService.create({
      nzTitle: 'Thêm và sửa thông tin',
      nzContent: PaymentDetailComponent,
      nzWidth: 600,
      nzFooter: null,
      nzOnOk: () => {
        const componentInstance = dialog.componentInstance;
        if (componentInstance) {
          // const Info = `${componentInstance.name}, ${componentInstance.gender}, ${componentInstance.email}, ${componentInstance.sdt}`;
          const Info = {
            name: componentInstance.name,
            gender:componentInstance.gender,
            email: componentInstance.email,
            sdt: componentInstance.sdt,
          };
          this.updateUserInfo(Info);
          dialog.close();
        }
      },
    });
    dialog.afterOpen.subscribe(() => {
      const componentInstance = dialog.componentInstance;
      if (componentInstance) {
        componentInstance.infoSubmitted.subscribe((Info:any) => {
          this.updateUserInfo(Info);
          dialog.close();
        });
      }
    });
  }

  openHandelDialogFlight(mode: string = DialogMode.view, item: any = null) {
    const dialog = this.dialogService.openDialog(
      async (option) => {
        option.title = 'Xem thông tin Vé';
        option.size = DialogSize.medium;
        option.component = PaymentFlightdetailComponent;
        option.inputs = {
          mode: mode,
          id: item?.flightId,
          item: this.selectedFlight,
          price: this.totalPrice
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

  updateUserInfo(Info: any) {
    if(Info == null)
      {
        this.userInfo = 'Thêm Thông Tin của bạn'
      }
      else{
        this.userInfo = Info;
      }
    console.log(this.userInfo)
  }
}
