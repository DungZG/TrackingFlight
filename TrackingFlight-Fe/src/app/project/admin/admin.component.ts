import { Component,Input } from '@angular/core';
@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  @Input() paddingLeft: any;
  isCollapsed = true;
  menuShow = false;
  constructor() {}
  toggleNavbar() {
    this.menuShow = !this.menuShow;
  }
  
}
