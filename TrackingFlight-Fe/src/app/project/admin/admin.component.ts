import { Component } from '@angular/core';
@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  isCollapsed = true;
  menuShow = false;
  toggleNavbar() {
    this.menuShow = !this.menuShow;
  }
}
