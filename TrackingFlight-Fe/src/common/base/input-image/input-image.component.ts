import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-input-image',
  standalone: false,
  
  templateUrl: './input-image.component.html',
  styleUrl: './input-image.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class InputImageComponent {

  @Input() listPreviewImages: any[] = [];
  public listDataImages: any[] = [];
  @Output() imagesChange = new EventEmitter<any[]>();

  async handleDeletePreviewImage(item: any) {
    // Xóa ảnh trong listPreviewImages
    const previewIndex = this.listPreviewImages.indexOf(item);
    if (previewIndex !== -1) {
      this.listPreviewImages.splice(previewIndex, 1);
    }

    // Xóa ảnh trong listOfImages theo vị trí tương ứng với mảng listPreviewImages
    if (previewIndex !== -1 && previewIndex < this.listDataImages.length) {
      this.listDataImages.splice(previewIndex, 1);
      this.emitImages();
    }
  }

  async handlePreviewImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      console.log(file.size)
      if(file.size > 5*1024*1024){
        // this.messageService.alert("Dung lượng file quá lớn. Vui lòng chọn file khác!");
        alert("Dung lượng file quá lớn!");
        return;
      }
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.listPreviewImages.push(e.target.result);
        this.listDataImages.push(file);
        this.emitImages();
      };
      reader.readAsDataURL(file);
    }
    input.value = '';
    
  }

  private emitImages() {
    this.imagesChange.emit(this.listDataImages);
  }

}
