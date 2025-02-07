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
import { DialogService, DialogSize } from '../../../../common/service/dialog.service';
import { StaffDetailAddComponent } from './staff-detail-add/staff-detail-add.component';
import {StaffService} from '../../../services/staff.service';
interface ItemData {
  id: string;
  name: string;
  age: string;
  address: string;
  phone: string;
}

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
  i = 0;
  editId: string | null = null;
  isCollapse = true; // Property to track collapse state

  constructor(
    private fb: FormBuilder,
    private dialogService: DialogService, 
    private staffService: StaffService
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
    debugger
    const resStaff = await firstValueFrom(this.staffService.getAllItems());
    this.listOfData = resStaff;
  }

  resetForm(): void {
    this.validateForm.reset();
  }

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }

  handlerOpenDialog(mode: string = 'add', item: any = null) {
    const dialog = this.dialogService.openDialog(
      async (option) => {
        option.title = mode === 'view' ? 'Xem thông tin Nhân Viên' : 'Thêm Thông Tin Nhân Viên';
        option.size = DialogSize.tab;
        option.component = StaffDetailAddComponent;
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
