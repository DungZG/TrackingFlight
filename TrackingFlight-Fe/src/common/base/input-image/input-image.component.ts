import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-image',
  standalone: false,
  templateUrl: './input-image.component.html',
  styleUrl: './input-image.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputImageComponent,
    multi: true
  }]
})
export class InputImageComponent implements ControlValueAccessor {

  @Input() listPreviewImages: any[] = [];
  @Input() imageValue: string | null = null;
  @Input() maxFileSize: number = 5 * 1024 * 1024; // 5MB mặc định
  @Input() acceptTypes: string = 'image/*';
  public listDataImages: any[] = [];
  @Output() imagesChange = new EventEmitter<any[]>();
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  async handleDeletePreviewImage(item: any) {
    const previewIndex = this.listPreviewImages.indexOf(item);
    
    if (previewIndex !== -1) {
      this.listPreviewImages.splice(previewIndex, 1);
    }
  
    if (previewIndex !== -1 && previewIndex < this.listDataImages.length) {
      this.listDataImages.splice(previewIndex, 1);
    }
  
    if (this.imageValue === item) {
      this.imageValue = null; // Xóa biến ảnh base64
    }
  
    this.emitImages();
  }

  async handlePreviewImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const file = input.files[0];

        if (file.size > this.maxFileSize) {
            alert("Dung lượng file quá lớn!");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e: any) => {
            const base64String = e.target.result;

            // Kiểm tra xem ảnh đã tồn tại trong danh sách chưa
            if (!this.listPreviewImages.includes(base64String)) {
                this.listPreviewImages.push(base64String);
                this.listDataImages.push(file);
                this.imageValue = base64String; 
                this.emitImages();
            }
        };
        reader.readAsDataURL(file);
    }
    input.value = '';
  }

  private emitImages() {
    this.imagesChange.emit(this.listDataImages);
    this.onChange(this.listDataImages.length > 0 ? this.imageValue : null);
  }
  

  writeValue(value: any): void {
    if (value && typeof value === 'string' && !this.listPreviewImages.includes(value)) {
        this.listPreviewImages = [value];  // Chỉ giữ một ảnh duy nhất nếu cần
        this.imageValue = value;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
