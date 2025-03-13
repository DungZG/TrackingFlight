import { Component,OnInit } from '@angular/core';
import { LocationService } from '../../../services/location.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-flight-ticket',
  standalone: false,
  templateUrl: './flight-ticket.component.html',
  styleUrl: './flight-ticket.component.scss'
})

export class FlightTicketComponent implements OnInit {
  public effect = 'scrollx';
  public isLoading = false;
  public listOfData:any;
  public list: any=[
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

  constructor(
    public locationService:LocationService
  ) { }

  async getData(){
    this.isLoading = true;
    const resLocation = await firstValueFrom(this.locationService.getAllItems());
    this.listOfData = resLocation;
    setTimeout(() => {
    this.isLoading = false;
    }, 1000);
  }

  ngOnInit():void {
    this.getData();
  }

}
