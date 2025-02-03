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
@Component({
  selector: 'app-ticket',
  standalone: false,
  
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent {
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
