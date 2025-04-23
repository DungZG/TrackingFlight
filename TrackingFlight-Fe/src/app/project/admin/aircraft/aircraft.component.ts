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
  totalItems: number = 0;
  currentPage: number = 0; 
  pageSize: number = 5; 
  public listType: any=[]
  public listCompany: any=[]
  public listOfCurrentPageData: any[] = [];
  public paging:any;
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

  async getData(page: number = 1){
    this.isLoading = true;
    const resAircraft = await this.aircraftService.getItemsWithPagination(page, this.pageSize).firstValueFrom();
    this.listOfData = resAircraft.result.content;
    this.totalItems = resAircraft.result.totalElements;
    this.isLoading = false;
  }

  onPageChange(page: number= 1) {
    this.currentPage = page;
    this.getData(page);
  }

  handlerOpenDialog(mode: string = 'add', item: any = null, index: number | null = null) {
    const dialog = this.dialogService.openDialog(
      async (option) => {
        option.title = mode === 'view' ? 'Xem thông tin Máy Bay' : 'Thêm Máy Bay ';
        if (mode === 'edit') {
          option.title = 'Sửa thông tin Máy Bay';
        }
        option.size = DialogSize.medium;
        option.component = AircraftdetailComponent; 
        option.inputs = {
          mode: mode,
          id: item?.aircraftCode, 
          aircraftData: item,  
        };
      },
      (eventName, eventValue) => {
        if (eventName === 'onClose') {
          this.isLoading = true;
          this.getData(); 
          this.dialogService.closeDialogById(dialog.id); 
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        }
      }
    );
  }

  async handlerDelete(index: number) {
    const aircraftToDelete = this.listOfData[index];
    const isConfirmed = confirm(`Bạn có chắc chắn muốn xóa máy bay: ${aircraftToDelete.aircraftName}?`);
  
    if (isConfirmed) {
      try {
        this.isLoading = true;
        await this.aircraftService.deleteItem(aircraftToDelete.aircraftCode);  
        this.listOfData.splice(index, 1); 
        this.isLoading = false;
        alert('Xóa thành công!');
      } catch (error) {
        this.isLoading = false;
        alert('Xóa thất bại!');
      }
    }
  }

  async onSearch(page: number = 1, size: number = 5) {
    const formValue = this.validateForm.value;
    this.isLoading = true;
  
    const searchParams: any = {};
    
    if (formValue.aircraftCode) {
      searchParams.aircraftCode = formValue.aircraftCode;
    }
    if (formValue.aircraftName) {
      searchParams.aircraftName = formValue.aircraftName;
    }
    if (formValue.airlineName) {
      searchParams.airlineName = formValue.airlineName;
    }
  
    searchParams.page = page;
    searchParams.size = size;
  
    try {
      const res = await this.aircraftService.searchAircraft(searchParams).firstValueFrom();
      
      if (res && res.result && res.result.content) {
        this.listOfData = res.result.content;
      } else {
        this.listOfData = [];
      }
      
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
