import { Component, OnInit } from '@angular/core';
import { DialogMode, } from '../../../../common/enums/dialog-mode';
import { DialogService, DialogSize } from '../../../../common/service/dialog.service';
import {UsersService} from './users.service'
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
  selector: 'app-user',
  standalone:false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})

export class UserComponent {
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
      private shareData: UsersService
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
}
