import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-payment_fail',
  standalone: false,
  templateUrl: './payment_fail.component.html',
  styleUrls: ['./payment_fail.component.css']
})
export class Payment_failComponent implements OnInit {

  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/user/flight-ticket/book']); // Điều hướng về trang chủ
  }

  ngOnInit() {
  }

}
