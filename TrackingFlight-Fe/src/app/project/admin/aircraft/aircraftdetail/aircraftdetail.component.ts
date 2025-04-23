import { Component, OnInit,Inject,Input } from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { firstValueFrom } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {AirlineService} from '../../../../services/airline.service'
import { DialogService, DialogSize } from '../../../../../common/service/dialog.service';
import { AircraftcontainerComponent } from './aircraftcontainer/aircraftcontainer.component';
import { AircraftService } from '../../../../services/aircraft.service';
@Component({
  selector: 'app-aircraftdetail',
  standalone: false,
  templateUrl: './aircraftdetail.component.html',
  styleUrls: ['./aircraftdetail.component.css']
})
export class AircraftdetailComponent implements OnInit {
    public validateForm: FormGroup;
    public listOfAirline: any[] = [];
    public isLoading:any = true;
    public cabinList: any[] = [];
    public cabin:any;
    @Input() items: { label: string, value: any }[] = [];
    @Input() mode: string;
    @Input() id: string;
    @Input() aircraftData: any;
    onClose = new EventEmitter<any | null>();
      constructor(
        private fb:FormBuilder,
        private airlineService:AirlineService,
        private dialogService: DialogService,
        private aircraftService:AircraftService,
        @Inject(NZ_MODAL_DATA) public data: any,
      ) 
      {
        this.validateForm = this.fb.group({
          aircraftName: [{ value: null, disabled: false }],
          aircraftCode: [{ value: null, disabled: false }],
          airlineId: [{ value: null, disabled: false }],
          tankage: [{ value: null, disabled: false }],
        })
      }
    
      ngOnInit() {
        this.getData();
        if(this.mode == 'view'){
          this.validateForm.get('aircraftName')?.value 
        }
      }

      async getData(){
        const resAirline= await this.airlineService.getAllItems().firstValueFrom();
        this.listOfAirline = resAirline.result;
        this.items = this.listOfAirline.map(item => ({
          label: item.name,
          value: item.airlineId
        }));
      }
    
      async closeDialog(){
        this.onClose.emit(null);
      }

      async saveData(){
        if (this.validateForm.invalid) {
          this.validateForm.markAllAsTouched();
          return;
        }
        const formValue = this.validateForm.value;
        const requestBody = {
          aircraftName: formValue.aircraftName,
          aircraftCode: formValue.aircraftCode,
          airlineId: formValue.airlineId,
          tankage: formValue.tankage,
          cavityList: this.cabinList.map((item: any) => ({
            cavityNumber: item.cavityNumber,
            cavityFrom: item.cavityFrom,
            cavityTo: item.cavityTo,
            cavityClass: item.cavityClass,
            price: item.price
          }))
        };
        debugger
        this.isLoading = true;
        const resAircraft = await this.aircraftService.saveWithRawData(requestBody).firstValueFrom();
        this.isLoading = false;
        this.onClose.emit(resAircraft);
      }

      handlerOpenDialog(mode: string = 'add', item: any = null,index: number | null = null) {
        const dialog = this.dialogService.openDialog(
          async (option) => {
            option.title = 'Thêm Khoang ';
                  if(mode === 'edit'){
                    option.title = 'Sửa thông tin Khoang';
                  }
                  option.size = DialogSize.medium;
                  option.component = AircraftcontainerComponent;
                  option.inputs = {
                    mode: mode,
                    item: item,
                    index: index
                  };
                },
                (eventName, eventValue) => {
                  if (eventName === 'onClose') {
                    if (eventValue) {
                      if (mode === 'edit' && index !== null) {
                        this.cabinList[index] = eventValue; 
                      } else {
                        this.cabinList.push(eventValue);
                      }
                    }
                    this.dialogService.closeDialogById(dialog.id);
                  }
                }
              );
       }

       handlerDelete(index: number){
        this.cabinList.splice(index, 1);
       }
}
