import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.scss'],
  standalone: false,
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputImageComponent,
    multi: true
  }]
})
export class InputImageComponent implements ControlValueAccessor {
  @Input() imageBase64: string | null = null; // Load ảnh từ base64
  @Input() maxFileSize: number = 5 * 1024 * 1024; // 5MB mặc định
  @Input() acceptTypes: string = 'image/*';
  @Output() imageChange = new EventEmitter<File | string | null>();

  public imageFile: File | null = null; // File ảnh nếu chọn mới
  public imageUrl: string | null = null; // URL ảnh từ file

  private onChange: (value: File | string | null) => void = () => {};
  private onTouched: () => void = () => {};

  handlePreviewImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (file.size > this.maxFileSize) {
        alert("Dung lượng file quá lớn!");
        return;
      }

      this.imageFile = file;
      this.imageUrl = URL.createObjectURL(file); // Hiển thị ảnh từ File
      this.imageBase64 = null; // Xóa base64 khi chọn ảnh mới
      this.emitImage();
    }
    input.value = ''; // Reset input
  }

  handleDeletePreviewImage() {
    this.imageFile = null;
    this.imageUrl = null;
    this.imageBase64 = null;
    this.emitImage();
  }

  private emitImage() {
    this.imageChange.emit(this.imageFile || this.imageBase64);
    this.onChange(this.imageFile || this.imageBase64);
  }

  writeValue(value: File | string | null): void {
    if (typeof value === 'string') {
      this.imageBase64 = value;
      this.imageFile = null;
      this.imageUrl = null;
    } else if (value instanceof File) {
      this.imageFile = value;
      this.imageUrl = URL.createObjectURL(value);
      this.imageBase64 = null;
    } else {
      this.imageBase64 = null;
      this.imageFile = null;
      this.imageUrl = null;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
