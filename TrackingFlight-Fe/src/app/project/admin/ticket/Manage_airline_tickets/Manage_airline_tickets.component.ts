import { Component } from '@angular/core';
import { DialogMode, } from '../../../../../common/enums/dialog-mode';
import { DialogService, DialogSize } from '../../../../../common/service/dialog.service';
import {
  FormBuilder,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,

} from '@angular/forms';
@Component({
  selector: 'app-Manage_airline_tickets',
  standalone: false,
  templateUrl: './Manage_airline_tickets.component.html',
  styleUrls: ['./Manage_airline_tickets.component.css']
})
export class Manage_airline_ticketsComponent {

  isPanelOpen = true;
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

}
