import { Component } from '@angular/core';
import { DialogMode, } from '../../../../common/enums/dialog-mode';
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
import {TicketService} from './ticket.service';
import { TicketdetailComponent } from './ticketdetail/ticketdetail.component';
@Component({
  selector: 'app-ticket',
  standalone: false,
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})

export class TicketComponent {
    public isPanelOpen = true;
    public listOfData:any;
    controlArray: Array<{ index: number; show: boolean }> = [];
    public isCollapse = true;
    public validateForm: FormGroup;
    public isLoading: any;
    i = 0;
    editId: string | null = null;
  
    constructor(
      private fb: FormBuilder,
      private dialogService: DialogService,
      private shareData:TicketService,
    ) {
      this.validateForm = this.shareData.myForm
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
          option.title = mode === 'view' ? 'Xem thông tin Vé' : 'Thêm Vé ';
          if(mode === 'edit'){
            option.title = 'Sửa thông tin vé';
          }
          option.size = DialogSize.medium;
          option.component = TicketdetailComponent;
          option.inputs = {
            mode: mode,
            id: item?.customerCode,
            listItem: this.listOfData,
          };
        },
        (eventName, eventValue) => {
          if (eventName === 'onClose') {
            this.isLoading = true
            // this.getData();
            this.dialogService.closeDialogById(dialog.id);
            // setTimeout(() => {
            // this.isLoading = false;
            // }, 1000);
          }
        }
      );
    }

}
