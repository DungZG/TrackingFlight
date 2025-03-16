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
import { Ticket_detailComponent } from './ticket_detail/ticket_detail.component';
@Component({
  selector: 'app-ticket',
  standalone: false,
  
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent {
    isPanelOpen = true;
    public listOfData:any;
    controlArray: Array<{ index: number; show: boolean }> = [];
    isCollapse = true;
    public validateForm: FormGroup;
    i = 0;
    editId: string | null = null;
  
    constructor(
      private fb: FormBuilder,
      private dialogService: DialogService,
    ) {
      this.validateForm = this.fb.group({
        ticketname: [null, [Validators.required]],
        ticketcode: [null, [Validators.required]],
        ticketstatus: [null, [Validators.required]],
      });
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

    handOpenDialog(mode: string = DialogMode.add, item: any = null){
      const dialog = this.dialogService.openDialog(
            async (option) => {
              option.title = mode === DialogMode.view ? 'Xem thông tin Nhân Viên' : 'Thêm Thông Tin Nhân Viên';
              if (mode === DialogMode.edit) {
                option.title = 'Cập nhật thông tin Nhân Viên';
              }
              option.size = DialogSize.xlarge;
              option.component = Ticket_detailComponent;
              option.inputs = {
                mode: mode,
                id: item?.staffCode,
                listItem: this.listOfData,
              };
            },
            (eventName, eventValue) => {
              if (eventName === 'onClose') {
                this.dialogService.closeDialogById(dialog.id);
              }
              // if (eventValue) {
              //   this.getData();
              // }
            }
          );
    }

}
