import { Component, OnInit,Inject,Input } from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { firstValueFrom } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '../../../../../common/service/dialog.service';
import {AirlineService} from '../../../../services/airline.service'
@Component({
  selector: 'app-aircraftdetail',
  standalone: false,
  templateUrl: './aircraftdetail.component.html',
  styleUrls: ['./aircraftdetail.component.css']
})
export class AircraftdetailComponent implements OnInit {
    public validateForm: FormGroup;
    public listOfAirline: any[] = [];
    @Input() items: { label: string, value: any }[] = [];
    onClose = new EventEmitter<any | null>();
      constructor(
        private fb:FormBuilder,
        private airlineService:AirlineService,
        
        @Inject(NZ_MODAL_DATA) public data: any,
      ) 
      {
        this.validateForm = this.fb.group({
          aircraftName: [null],
          aircraftCode: [null],
          cavityNumber: [null],
          airlineName: [null],
          tankage: [null],
          cavityTo: [null],
          cavityFrom: [null],
          price: [null]
        })
      }
    
      ngOnInit() {
        this.getData();
      }

      async getData(){
        const resAirline= await this.airlineService.getAllItems().firstValueFrom();
        this.listOfAirline = resAirline.result;
        this.items = this.listOfAirline.map(item => ({
          label: item.name,
          value: item.name
        }));
      }
    
      async closeDialog(){
        this.onClose.emit(null);
      }

}
