import { Component, OnInit } from '@angular/core';
import { DialogService, DialogSize } from '../../../../common/service/dialog.service';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import '../../../../common/global-extension';
import{MessageService} from '../../../../common/service/message.service';
import { CustomerService } from '../../../services/customer.service';
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
  isLoading = false;
  public validateForm: FormGroup;
  i = 0;
  editId: string | null = null;
  public listOfData: any[] = [];

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
    this.dialogService.openLoading();
    this.getData();
    this.dialogService.closeLoading();
  }

  async getData() {
    this.isLoading = true;
    const resStaff = await this.customerService.getAllItems().firstValueFrom();
    
    this.listOfData = resStaff;
    setTimeout(() => {
    this.isLoading = false;
    }, 1000);
  }

  handlerOpenDialog(mode: string = 'add', item: any = null) {
      const dialog = this.dialogService.openDialog(
        async (option) => {
          option.title = mode === 'view' ? 'Xem thông tin Khách Hàng' : 'Thêm Thông Tin Khách Hàng';
          if(mode === 'edit'){
            option.title = 'Sửa thông tin Khách Hàng';
          }
          option.size = DialogSize.medium;
          option.component = CustomerDetailComponent;
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

    async handlerDelete(item: any) {
      try {
        const confirm = await this.messageService.confirm(
          'Bạn có chắc chắn muốn xóa dữ liệu này không?'
        );
        if (!confirm) return;
        this.dialogService.openLoading();
        await this.customerService.deleteItem(item.customerCode).firstValueFrom();
    
        this.dialogService.closeLoading();
        this.messageService.notiMessageSuccess('Xóa dữ liệu thành công');
    
        this.getData();
      } catch (error) {
        this.dialogService.closeLoading();
        this.messageService.notiMessageError('Xóa dữ liệu thất bại');
      }
    }
    
} 
