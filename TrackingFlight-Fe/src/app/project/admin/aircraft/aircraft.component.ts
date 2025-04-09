import { Component, OnInit } from '@angular/core';
import { AircraftdetailComponent } from './aircraftdetail/aircraftdetail.component';
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
import { AircraftDetailService } from './aircraft.service';
@Component({
  selector: 'app-aircraft',
  standalone: false,
  templateUrl: './aircraft.component.html',
  styleUrls: ['./aircraft.component.css']
})
export class AircraftComponent {

  isPanelOpen = true;
  public isLoading: any;
  public listOfData:any;
      controlArray: Array<{ index: number; show: boolean }> = [];
      isCollapse = true;
      public validateForm: FormGroup;
      i = 0;
      editId: string | null = null;

      public listType: any=[

      ]
      public listCompany: any=[

      ]

      constructor(
        private fb: FormBuilder,
        private dialogService: DialogService,
        private shareData: AircraftDetailService,
      ) {
        this.validateForm = this.shareData.myForm
      }

  ngOnInit() {
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
  async getData(){

  }

  handlerOpenDialog(mode: string = 'add', item: any = null) {
        const dialog = this.dialogService.openDialog(
          async (option) => {
            option.title = mode === 'view' ? 'Xem thông Máy Bay' : 'Thêm Máy Bay ';
            if(mode === 'edit'){
              option.title = 'Sửa thông tin Máy Bay';
            }
            option.size = DialogSize.medium;
            option.component = AircraftdetailComponent;
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

}
