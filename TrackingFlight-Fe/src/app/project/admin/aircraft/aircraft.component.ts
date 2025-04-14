import { Component, OnInit } from '@angular/core';
import { AircraftdetailComponent } from './aircraftdetail/aircraftdetail.component';
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
import { AircraftDetailService } from './aircraft.service';
import { AircraftService } from '../../../services/aircraft.service';
@Component({
  selector: 'app-aircraft',
  standalone: false,
  templateUrl: './aircraft.component.html',
  styleUrls: ['./aircraft.component.css']
})
export class AircraftComponent {
  isPanelOpen = true;
  public isLoading: any;
  public listOfData: any[] = [];
  controlArray: Array<{ index: number; show: boolean }> = [];
  isCollapse = true;
  public validateForm: FormGroup;
  i = 0;
  editId: string | null = null;
  public listType: any=[]
  public listCompany: any=[]
  public listOfCurrentPageData: any[] = [];
  public listAirline:any []= [
    { label: 'Vietnam Airlines', value: '1' },
    { label: 'VietJet ', value: '2' }
  ];
      constructor(
        private fb: FormBuilder,
        private dialogService: DialogService,
        private shareData: AircraftDetailService,
        private aircraftService: AircraftService,
      ) {
        this.validateForm = this.shareData.myForm
      }

  ngOnInit() {
    this.getData();
  }

  async getData(){
    this.isLoading = true;
    const resAircraft = await this.aircraftService.getAllItems().firstValueFrom();
    this.listOfData = resAircraft.result;
    this.isLoading = false;
  }

  handlerOpenDialog(mode: string = 'add', item: any = null, index: number | null = null) {
    const dialog = this.dialogService.openDialog(
      async (option) => {
        // Chọn tiêu đề dialog theo chế độ
        option.title = mode === 'view' ? 'Xem thông tin Máy Bay' : 'Thêm Máy Bay ';
        if (mode === 'edit') {
          option.title = 'Sửa thông tin Máy Bay';
        }
  
        // Cấu hình dialog
        option.size = DialogSize.medium;
        option.component = AircraftdetailComponent; // Component chứa form
        option.inputs = {
          mode: mode,
          id: item?.aircraftCode,  // Dùng id (mã máy bay)
          aircraftData: item,  // Dữ liệu chi tiết của máy bay
        };
      },
      (eventName, eventValue) => {
        if (eventName === 'onClose') {
          this.isLoading = true;
          this.getData(); // Lấy lại dữ liệu sau khi đóng popup
          this.dialogService.closeDialogById(dialog.id); // Đóng dialog
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        }
      }
    );
  }

  async handlerDelete(index: number) {
    const aircraftToDelete = this.listOfData[index];
  
    // Xác nhận xóa
    const isConfirmed = confirm(`Bạn có chắc chắn muốn xóa máy bay: ${aircraftToDelete.aircraftName}?`);
  
    if (isConfirmed) {
      try {
        this.isLoading = true;
        await this.aircraftService.deleteItem(aircraftToDelete.aircraftCode);  // Gọi service xóa
        this.listOfData.splice(index, 1);  // Xóa máy bay khỏi danh sách trong frontend
        this.isLoading = false;
        alert('Xóa thành công!');
      } catch (error) {
        this.isLoading = false;
        alert('Xóa thất bại!');
      }
    }
  }

  // Gọi API tìm kiếm khi nhấn Tìm Kiếm
  async onSearch() {
    const formValue = this.validateForm.value;
    this.isLoading = true;
  
    const searchParams: any = {};
  
    // Chỉ thêm các tham số có giá trị vào searchParams
    if (formValue.aircraftCode) {
      searchParams.aircraftCode = formValue.aircraftCode;
    }
    if (formValue.aircraftName) {
      searchParams.aircraftName = formValue.aircraftName;
    }
    if (formValue.airlineName) {
      searchParams.airlineName = formValue.airlineName;
    }
  
    try {
      const res = await this.aircraftService.searchAircraft(searchParams).firstValueFrom();
      this.listOfData = res.result;
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      this.isLoading = false;
    }
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
