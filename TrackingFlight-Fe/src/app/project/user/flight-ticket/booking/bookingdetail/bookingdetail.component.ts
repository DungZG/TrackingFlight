import { Component, OnInit,Inject } from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { firstValueFrom } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '../../../../../../common/service/dialog.service';
import { DialogMode, DialogSize } from '../../../../../../common/service/dialog.service';
import { FlightdetailComponent } from '../../flightdetail/flightdetail.component';
@Component({
  selector: 'app-bookingdetail',
  standalone: false,
  templateUrl: './bookingdetail.component.html',
  styleUrls: ['./bookingdetail.component.css']
})
export class BookingdetailComponent implements OnInit {
  public listOfData:any;
  onClose = new EventEmitter<any | null>();
  constructor(
    public dialogService: DialogService,
    @Inject(NZ_MODAL_DATA) public data: any,
  ) { }

  ngOnInit() {
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
