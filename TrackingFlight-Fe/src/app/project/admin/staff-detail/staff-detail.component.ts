import { Component,OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { DialogMode,DialogService, DialogSize } from '../../../../common/service/dialog.service';
import { StaffDetailAddComponent } from './staff-detail-add/staff-detail-add.component';
import {StaffService} from '../../../services/staff.service';
import {StaffDetailService} from './staff-detail.service';
@Component({
  selector: 'app-staff-detail',
  standalone: false,
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.scss']
})
export class StaffDetailComponent implements OnInit {
  isPanelOpen = true;
  public validateForm: FormGroup;
  public listOfData: any[] = [];
  isCollapse = true;
  public isLoading = false;
  public listRole: any[] = [
    {
      value: 0,
      label: 'Nhân Viên'
    },
    {
      value: 1,
      label: 'Quản Lý'
    },
    {
      value: 2,
      label: 'Admin'
    },
  ];
  public listGender: any[] = [
    {
      value: 0,
      label: 'Nam'
    },
    {
      value: 1,
      label: 'Nữ'
    },
  ];
  public listFacility: any[] = [
    {
      value: 0,
      label: 'Hà Nội'
    },
    {
      value: 1,
      label: 'Hồ Chí Minh'
    },
  ];
  constructor(
    private fb: FormBuilder,
    private dialogService: DialogService, 
    private staffService: StaffService,
    private shareData: StaffDetailService,
  ) {
    this.validateForm = this.fb.group({
      staffname: [null, [Validators.required]],
      staffcode: [null, [Validators.required]],
      staffphone: [null, [Validators.required]],
      address: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getDate()
  }

  async getDate(){
    this.isLoading = true;
    const resStaff = await firstValueFrom(this.staffService.getAllItems());
    
    this.listOfData = resStaff;
    this.isLoading = false;
  }

  resetForm(): void {
    this.validateForm.reset();
  }

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }

  handlerOpenDialog(mode: string = DialogMode.add, item: any = null) {
    const dialog = this.dialogService.openDialog(
      async (option) => {
        option.title = mode === DialogMode.view ? 'Xem thông tin Nhân Viên' : 'Thêm Thông Tin Nhân Viên';
        if (mode === DialogMode.edit) {
          option.title = 'Cập nhật thông tin Nhân Viên';
        }
        option.size = DialogSize.tab;
        option.component = StaffDetailAddComponent;
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
        if (eventValue) {
          
        }
      }
    );
  }
}
