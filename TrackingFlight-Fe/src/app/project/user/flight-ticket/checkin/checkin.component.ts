import { Component, OnInit } from '@angular/core';
import { CheckinService } from './checkin.service';

@Component({
  selector: 'app-checkin',
  standalone: false,
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {
  public validateForm: any;
  constructor(
    public shareDate: CheckinService,
  ) { 
    this.validateForm = this.shareDate.myForm
  }

  ngOnInit() {
  }

}
