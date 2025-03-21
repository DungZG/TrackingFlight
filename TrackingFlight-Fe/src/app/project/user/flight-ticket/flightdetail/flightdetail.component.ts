import { Component, OnInit,EventEmitter } from '@angular/core';
import { FlightService } from '../flight.service';
@Component({
  selector: 'app-flightdetail',
  standalone: false,
  templateUrl: './flightdetail.component.html',
  styleUrls: ['./flightdetail.component.css']
})
export class FlightdetailComponent implements OnInit {
  onClose = new EventEmitter<any | null>();
  constructor(
    public shareData: FlightService,
  ) { }


  ngOnInit():void {
    this.shareData.onClose = this.onClose;
  }

  async closeDialog(){
    this.shareData.closeDialog()
  }
}
