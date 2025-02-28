import { Component, OnInit,EventEmitter } from '@angular/core';
import { DialogService, DialogSize } from '../../../../../common/service/dialog.service';
import '../../../../../common/global-extension';
import{MessageService} from '../../../../../common/service/message.service';
import { CustomerService } from '../../../../services/customer.service';
import { AircraftManagementService } from './aircraft-management.service';
import {
  FormBuilder,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,

} from '@angular/forms';
import { AircraftDetailComponent } from './Aircraft-detail/Aircraft-detail.component';
import { AircraftService } from '../../../../services/aircraft.service';
@Component({
  selector: 'app-Aircraft-management',
  standalone: false,
  templateUrl: './Aircraft-management.component.html',
  styleUrls: ['./Aircraft-management.component.css']
})
export class AircraftManagementComponent implements OnInit {
  onClose = new EventEmitter<any | null>();
  public validateForm: FormGroup;
  isCollapse = true;
  isPanelOpen = true;
  public isLoading = false;
  public listOfData: any;
  public listType:any = [
 
  ];
  public listCompany:any =[

  ];
  constructor(
      private fb: FormBuilder,
      private sharedata: AircraftManagementService,
      private dialogService: DialogService,
      private messageService: MessageService,
      private aircraftService :AircraftService
    ) {
      this.validateForm = this.fb.group({
        
      });
    }

  async closeDialog() {
      this.onClose.emit(null);
  }

  async getData(){
    this.isLoading = true;
    const resAircraft = await this.aircraftService.getAllItems().firstValueFrom();
    this.listOfData = resAircraft;
    
    setTimeout(() => {
    this.isLoading = false;
    }, 1000);
  }

  ngOnInit() {
    this.getData();
  }

  resetForm(): void {
    this.validateForm.reset();
  }

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }

  handlerOpenDialog(mode: string = 'add', item: any = null) {
        const dialog = this.dialogService.openDialog(
          async (option) => {
            option.title = mode === 'view' ? 'Xem thông tin Máy Bay' : 'Thêm Thông Tin Máy Bay';
            if(mode === 'edit'){
              option.title = 'Sửa thông tin Máy Bay';
            }
            option.size = DialogSize.medium;
            option.component = AircraftDetailComponent;
            option.inputs = {
              mode: mode,
              id: item?.customerCode,
            };
          },
          (eventName, eventValue) => {
            if (eventName === 'onClose') {
              this.isLoading = true
              this.getData();
              this.dialogService.closeDialogById(dialog.id);
              setTimeout(() => {
              this.isLoading = false;
              }, 1000);
            }
          }
        );
      }
}
