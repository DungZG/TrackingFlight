import { Component, OnInit } from '@angular/core';
import { DialogService, DialogSize } from '../../../../common/service/dialog.service';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
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
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {
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
      customername: [null, [Validators.required]],
      customercode: [null, [Validators.required]],
      customerphone: [null, [Validators.required]],
      address: [null, [Validators.required]],
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

  ngOnInit(): void {

  }

  handlerOpenDialog(mode: string = 'add', item: any = null) {
      const dialog = this.dialogService.openDialog(
        async (option) => {
          option.title = mode === 'view' ? 'Xem thông tin Khách Hàng' : 'Thêm Thông Tin Khách Hàng';
          option.size = DialogSize.tab;
          option.component = CustomerDetailComponent;
          option.inputs = {};
        },
        (eventName, eventValue) => {
          if (eventName === 'onClose') {
            this.dialogService.closeDialogById(dialog.id);
          }
        }
      );
    }
} 
