import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-payment_success',
  standalone: false,
  templateUrl: './payment_success.component.html',
  styleUrls: ['./payment_success.component.css']
})
export class Payment_successComponent implements OnInit {
  paymentId: string | null = null;
  amount: number | null = null;
  paymentTime: Date | null = null;

  constructor(private route: ActivatedRoute,
    private router: Router
  ) { }

   ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.paymentId = params['vnp_TxnRef'] || null;
      this.amount = params['vnp_Amount'] ? +params['vnp_Amount'] / 100 : null; // chia 100 vì VNPAY gửi amount * 100
      const payDate = params['vnp_PayDate'];
      if (payDate) {
        // Format YYYYMMDDHHmmss thành Date
        const y = +payDate.substring(0,4);
        const m = +payDate.substring(4,6) -1;
        const d = +payDate.substring(6,8);
        const h = +payDate.substring(8,10);
        const min = +payDate.substring(10,12);
        const s = +payDate.substring(12,14);
        this.paymentTime = new Date(y, m, d, h, min, s);
      } else {
        this.paymentTime = new Date();
      }
    });
  }

  backToHome() {
    this.router.navigate(['/']);
  }

}
