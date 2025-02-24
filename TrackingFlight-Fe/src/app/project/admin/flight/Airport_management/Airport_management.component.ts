import { Component, OnInit } from '@angular/core';
import { DialogService, DialogSize } from '../../../../../common/service/dialog.service';
import '../../../../../common/global-extension';
import{MessageService} from '../../../../../common/service/message.service';
import { CustomerService } from '../../../../services/customer.service';
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
  selector: 'app-Airport_management',
  standalone: false,
  templateUrl: './Airport_management.component.html',
  styleUrls: ['./Airport_management.component.css']
})
export class Airport_managementComponent implements OnInit {

  public validateForm: FormGroup;
  isCollapse = true;
  isPanelOpen = true;
  public listType:any = [

  ];
  public listCompany:any =[

  ];
  constructor(
      private fb: FormBuilder,
      private dialogService: DialogService,
      private messageService: MessageService,
      private customerService: CustomerService,
    ) {
      this.validateForm = this.fb.group({
        customername: [null, [Validators.required]],
        customercode: [null, [Validators.required]],
        customerphone: [null, [Validators.required]],
        address: [null, [Validators.required]],
      });
    }

  ngOnInit() {

  }

  resetForm(): void {
    this.validateForm.reset();
  }

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }

}
