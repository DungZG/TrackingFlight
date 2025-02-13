import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnChanges {
  @Input() paddingLeft: any;
  isCollapsed = true;
  ngOnChanges(changes: SimpleChanges) {
    if (changes['paddingLeft']) {
      console.log('paddingLeft đã thay đổi:', changes['paddingLeft'].currentValue);
    }
  }
}
