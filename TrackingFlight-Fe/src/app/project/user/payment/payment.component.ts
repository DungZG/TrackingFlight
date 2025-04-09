import { Component, OnInit } from '@angular/core';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';
import { DialogMode, DialogService, DialogSize } from '../../../../common/service/dialog.service';
import { PaymentDetailService } from './payment.service';
import { FlightdetailComponent } from '../flight-ticket/flightdetail/flightdetail.component';
interface SeatInfo {
  id: string;
  type: 'first' | 'business' | 'economy';
  status: 'available' | 'occupied' | 'selected';
  position: 'window' | 'middle' | 'aisle';
}
@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  public checked:any = true
  private listOfData:any;
  public seatData:any;
  rows = Array.from({ length: 30 }, (_, i) => i + 1);
  leftSection = ['A', 'B'];
  middleSection = ['C', 'D', 'E'];
  rightSection = ['F', 'G'];
  
  seatMap: { [key: string]: SeatInfo } = {};
  selectedSeats: string[] = [];

  log(selectedSeats: string[]): void {
    console.log(selectedSeats);
  }

  //  // Khởi tạo trạng thái checkbox
  //  checkedStates: boolean[][] = this.rows.map(() => 
  //   new Array(this.headers.length).fill(false)
  // );
  constructor(
    public dialogService: DialogService,
  ) { 
    this.initializeSeatMap();
  }

  ngOnInit() {
  }
  private initializeSeatMap() {
    this.rows.forEach(row => {
      [...this.leftSection, ...this.middleSection, ...this.rightSection].forEach(col => {
        const seatId = `${col}${row}`;
        this.seatMap[seatId] = {
          id: seatId,
          type: this.getSeatType(row),
          status: 'available',
          position: this.getSeatPosition(col)
        };
      });
    });
  }

  private getSeatType(row: number): 'first' | 'business' | 'economy' {
    if (row <= 2) return 'first';
    if (row <= 7) return 'business';
    return 'economy';
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
      this.selectedSeats = this.selectedSeats.filter(
        id => id !== seatId
      );
      this.seatMap[seatId].status = 'available';
    } else {
      this.selectedSeats.push(seatId);
      this.seatMap[seatId].status = 'selected';
    }
    this.seatData = this.selectedSeats;

    console.log(this.seatMap[seatId])
  }
  current = 0;
  openHandelDialog(mode: string = DialogMode.add, item: any = null) {
      const dialog = this.dialogService.openDialog(
        async (option) => {
          option.title = 'Thêm và sửa thông tin';
          option.size = DialogSize.medium;
          option.component = PaymentDetailComponent;
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

    openHandelDialogFlight(mode: string = DialogMode.add, item: any = null) {
      const dialog = this.dialogService.openDialog(
        async (option) => {
          option.title = 'Thêm và sửa thông tin';
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

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
  }

  done(): void {
    console.log('done');
  }

}
