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
    this.cdr.detectChanges();  
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['paddingLeft']) {
      console.log('paddingLeft đã thay đổi:', changes['paddingLeft'].currentValue);
    }
  }
}
