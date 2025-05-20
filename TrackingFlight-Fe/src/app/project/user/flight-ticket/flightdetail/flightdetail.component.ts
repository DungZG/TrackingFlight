import { Component, OnInit,EventEmitter,Input ,Inject} from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { FlightTicketService } from '../flight.service';
import { LocationService } from '../../../../services/location.service';
import { FlightService } from '../../../../services/flight.service';
import { Router } from '@angular/router';
interface Loaction{
  name: string,
  locationId: number,
  locationCode: string,
}
@Component({
  selector: 'app-flightdetail',
  standalone: false,
  templateUrl: './flightdetail.component.html',
  styleUrls: ['./flightdetail.component.css']
})
export class FlightdetailComponent implements OnInit {
  onClose = new EventEmitter<any | null>();
  public selectedFlight: any;
  public isLoading = true;
  public id :any ;
  public listOfLocation: any []=[];
  public listOfCodeLocation: any []=[];
  public listType:any []=[
    { label: 'Khứ Hồi', value: 2 },
    { label: 'Một Chiều', value: 1 },
  ];
  @Input() item: any;
  @Input() mode:any;
  constructor(
    public shareData: FlightTicketService,
    public locationService: LocationService,
    public flightService : FlightService,
    private router: Router,
    @Inject(NZ_MODAL_DATA) public data: any,
  ) { 
   
  }


  ngOnInit():void {
    this.shareData.onClose = this.onClose;
    if(this.data.mode == 'view'){
      this.getData()
    }
  }

  async getData(){
    this.isLoading = true;
    const resLocation = await this.locationService.getAllItems().firstValueFrom();
    this.isLoading = false;
    this.listOfLocation = resLocation.map((item:Loaction) => ({
      label: item.name,
      value: item.locationId
    }));
    this.listOfCodeLocation = resLocation.map((item:Loaction) => ({
      label: item.locationCode,
      value: item.locationId
    }));
  }

  async closeDialog(){
    this.shareData.closeDialog()
  }

  async onSelectFlight() {
    const selectFlight = await this.flightService.getItem(this.data.id).firstValueFrom();
    this.flightService.setSelectedFlight(selectFlight);
    this.router.navigate(['/user/payment']);
    this.closeDialog();
  }
}
