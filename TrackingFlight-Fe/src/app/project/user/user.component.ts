import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  standalone: false,
  
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  formGroup!: FormGroup;
  isLoggedIn = false;
  username: string | null = null;

  constructor(private fb: FormBuilder,
    private authService:LoginService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      dateRange: [null], 
    });

    // Giám sát trạng thái đăng nhập
    this.authService.isLoggedIn().subscribe(logged => {
    this.isLoggedIn = logged;
    if (logged) {
    const user = this.authService.getCurrentUser();
    this.username = user ? user.username : null;
    } else {
    this.username = null;
      }
    });
  }

   logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
