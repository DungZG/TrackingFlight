import { Component, OnInit,OnDestroy } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';
import { FlightService } from '../../../services/flight.service';
import { LocationService } from '../../../services/location.service';
import { DialogService, DialogMode, DialogSize } from '../../../../common/service/dialog.service';
import { FlightdetailComponent } from '../flight-ticket/flightdetail/flightdetail.component';
import { PaymentFlightdetailComponent } from './payment-flightdetail/payment-flightdetail.component';
import { PaymentService } from '../../../services/payment.service';
import { firstValueFrom } from 'rxjs';
import { Payment } from './payment-response.model';
import { SeatSelectionWebsocketService, SeatSelectionMessage } from './seat-selection-websocket.service';

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
export class PaymentComponent implements OnInit, OnDestroy {
  private userId = 'user-123'; // lấy user id thật ở hệ thống của bạn
  private flightId: number;
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
  private seatTimers: { [seatId: string]: any } = {};
  private HOLD_DURATION = 2 * 60 * 1000; // 2 phút
  public seatMap: { [key: string]: SeatInfo } = {};
  public selectedSeats: string[] = [];
  constructor(
    public dialogService: DialogService,
    private modalService: NzModalService,
    private flightService: FlightService,
    private locationService: LocationService,
    private paymentService: PaymentService,
    private seatWSService: SeatSelectionWebsocketService,
  ) { 
   
  }

  ngOnInit(): void {
   const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
   this.userId = currentUser.userId || 'user-' + Date.now();
    this.getData().then(() => {
    this.flightId = this.selectedFlight.flightId;
    this.initializeSeatMap(); // ✅ Đặt ở đây: sau khi đã có selectedFlight

    this.seatWSService.connect(this.flightId);
    this.seatWSService.getSeatUpdates().subscribe((msg: SeatSelectionMessage) => {
      console.log("📩 Client nhận được:", msg);
      this.handleSeatMessage(msg);
    });
  });
    this.totalPrice = this.selectedFlight.price; 
  }

  ngOnDestroy(): void {
    this.seatWSService.disconnect();
    
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

    // Gửi message release cho ghế này
    this.seatWSService.sendSeatAction({
      flightId: this.flightId,
      seatNumber: seatId,
      action: 'release',
      userId: this.userId
    });
  } else {
    this.selectedSeats.push(seatId);
    this.seatMap[seatId].status = 'selected';

    // Gửi message select cho ghế này
    this.seatWSService.sendSeatAction({
      flightId: this.flightId,
      seatNumber: seatId,
      action: 'select',
      userId: this.userId
    });
  }
  this.seatData = this.selectedSeats;
  }

  handleSeatMessage(msg: SeatSelectionMessage) {
  console.log('📥 Message từ server:', msg);
  console.log('🧍 My userId:', this.userId);

  const seatId = msg.seatNumber;
  if (msg.userId === this.userId) {
    console.log('⛔ Bỏ qua vì là message của chính mình');
    return;
  }

  console.log('✅ Update UI cho seat:', seatId, '→', msg.action);

  switch (msg.action) {
    case 'select':
      if (this.seatMap[seatId]?.status === 'available') {
        this.seatMap[seatId].status = 'selected';
      }
      break;
    case 'release':
      if (this.seatMap[seatId]) {
        this.seatMap[seatId].status = 'available';
      }
      break;
    case 'book':
      if (this.seatMap[seatId]) {
        this.seatMap[seatId].status = 'occupied';
      }
      break;
  }
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
    const seatId = this.selectedSeats[0]; // chỉ chọn 1 ghế
    if (seatId && this.seatMap[seatId]) {
    const seatPrice = this.seatMap[seatId].price;
    const flightBasePrice = this.selectedFlight.price;

    // Cộng thêm hành lý nếu đã chọn
    const baggagePrice = this.checked ? 244136.60 : 0;

    // Vé linh hoạt thì nhân 1.1
    const flexiblePrice = this.isFlexibleTicket ? flightBasePrice * 0.1 : 0;

    this.totalPrice = flightBasePrice + seatPrice + baggagePrice + flexiblePrice;
    }
  }

  updateTotalPriceBySeat(): void {
  const seatId = this.selectedSeats[0]; // chọn 1 ghế
  const seatPrice = seatId && this.seatMap[seatId]?.price || 0;
  const basePrice = this.selectedFlight.price;
  const baggage = this.checked ? 244000 : 0;
  const flexible = this.isFlexibleTicket ? basePrice * 0.1 : 0;

  this.totalPrice = basePrice + seatPrice + baggage + flexible;
}

  current = 0;
  pre(): void {
    this.current -= 1;
    this.updateTotalPriceBySeat();
  }

  next(): void {
    this.current += 1;
    this.toggleFlexibleTicket()
    this.updateTotalPriceBySeat();
  }

  async done(): Promise<void> {
  const res: Payment = await this.paymentService.createPayment(this.totalPrice, 'NCB', 'vn').firstValueFrom();
  if (res.status === 'Ok' && res.url) {
    // Gửi thông báo đặt ghế
    this.selectedSeats.forEach(seatId => {
      this.seatWSService.sendSeatAction({
        flightId: this.flightId,
        seatNumber: seatId,
        action: 'book',
        userId: this.userId
      });
    });

    window.location.href = res.url;
  } else {
    alert('Lỗi tạo link thanh toán: ' + res.message);
  }
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
