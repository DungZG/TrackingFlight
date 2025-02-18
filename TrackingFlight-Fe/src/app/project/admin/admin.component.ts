import { Component, Input, OnChanges, SimpleChanges, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements AfterViewInit {
  @Input() paddingLeft: any;
  isCollapsed = true;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    // Đảm bảo Angular đã kiểm tra xong giá trị
    this.cdr.detectChanges();  // Force Angular to check for changes after view initialization
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['paddingLeft']) {
      console.log('paddingLeft đã thay đổi:', changes['paddingLeft'].currentValue);
    }
  }
}
