import { Component, OnInit,Input } from '@angular/core';
import { DialogService, DialogSize } from '../../../../common/service/dialog.service';
import {
  FormBuilder,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,

} from '@angular/forms';
import {FlightDetailService} from'./flight.service';
import { FlightdetailComponent } from './flightdetail/flightdetail.component';
import { LocationService } from '../../../services/location.service'; 
@Component({
  selector: 'app-flight',
  standalone: false,
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.scss'
})
export class FlightComponent{
  isPanelOpen = true;
  public isLoading: any;
  public listOfData:any;
  @Input() items: { label: string, value: any }[] = [];
      controlArray: Array<{ index: number; show: boolean }> = [];
      isCollapse = true;
      public validateForm: FormGroup;
      i = 0;
      editId: string | null = null;

      public listType: any=[

      ]
      public listCompany: any []=[

      ]

      constructor(
        private fb: FormBuilder,
        private dialogService: DialogService,
        private shareData: FlightDetailService,
        private locationService:LocationService
      ) {
        this.validateForm = this.shareData.myForm
      }

  ngOnInit() {
    this.getData();

  }


  async getData(){

  }

  handlerOpenDialog(mode: string = 'add', item: any = null) {
        const dialog = this.dialogService.openDialog(
          async (option) => {
            option.title = mode === 'view' ? 'Xem thông Chuyến Bay' : 'Thêm Chuyến Bay ';
            if(mode === 'edit'){
              option.title = 'Sửa thông tin Chuyến Bay';
            }
            option.size = DialogSize.medium;
            option.component = FlightdetailComponent;
            option.inputs = {
              mode: mode,
              id: item?.customerCode,
              listItem: this.listOfData,
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

      toggleCollapse(): void {
        this.isCollapse = !this.isCollapse;
        this.controlArray.forEach((c, index) => {
          c.show = this.isCollapse ? index < 6 : true;
        });
      }
    
      resetForm(): void {
        this.validateForm.reset();
      }
    
    
      startEdit(id: string): void {
        this.editId = id;
      }
    
      stopEdit(): void {
        this.editId = null;
      }
}
