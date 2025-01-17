import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,

} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { DialogMode, } from '../../../../common/enums/dialog-mode';
import { DialogService ,DialogSize} from '../../../../common/service/dialog.service';
import { StaffDetailAddComponent } from './staff-detail-add/staff-detail-add.component';
interface ItemData {
  id: string;
  name: string;
  age: string;
  address: string;
}
@Component({
  selector: 'app-staff-detail',
  standalone: false,
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.scss'] // Fix: đổi `styleUrl` thành `styleUrls`

})
export class StaffDetailComponent {
  isPanelOpen = true;
  controlArray: Array<{ index: number; show: boolean }> = [];
  isCollapse = true;
  public validateForm: FormGroup;
  i = 0;
  editId: string | null = null;
  listOfData: ItemData[] = [];

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

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: `${this.i}`,
        name: `Edward King ${this.i}`,
        age: '32',
        address: `London, Park Lane no. ${this.i}`
      }
    ];
    this.i++;
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }

  ngOnInit(): void {
    this.addRow();
    this.addRow();
  }


  handlerOpenDialog(mode: string = DialogMode.add, item: any = null) {
    const dialog = this.dialogService.openDialog(
      async (option) => {
        option.title = mode === 'view' ? 'Xem thông tin cơ sở lưu trú' : 'Thêm mới cơ sở lưu trú';
        option.size = DialogSize.tab;
        option.component = StaffDetailAddComponent;
        option.inputs = {
          id: item?.uuid,
          item: item,
          mode: mode,
        };
      },
      (eventName, eventValue) => {
        if (eventName === 'onClose') {
          this.dialogService.closeDialogById(dialog.id);
          // if (eventValue) {
          //   this.getData({ ...this.paging });
          // }
        }
      }
    );
  }

}
