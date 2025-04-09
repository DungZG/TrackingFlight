import { Component, OnInit,EventEmitter } from '@angular/core';
import { PaymentDetailService } from '../payment.service';
@Component({
  selector: 'app-payment-detail',
  standalone:false,
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {
  onClose = new EventEmitter<any | null>();
    constructor(
      public shareData: PaymentDetailService,
    ) { }
  
  
    ngOnInit():void {
      this.shareData.onClose = this.onClose;
    }
  
    async closeDialog(){
      this.shareData.closeDialog()
    }

}
