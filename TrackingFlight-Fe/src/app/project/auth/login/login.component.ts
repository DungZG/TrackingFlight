import { Component, AfterViewInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { LoginServices } from './login.service';
import {LoginService} from '../../../services/login.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../../../../public/css/bootstrap.min.css']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('registerButton', { static: true }) registerButton!: ElementRef;
  @ViewChild('loginButton', { static: true }) loginButton!: ElementRef;
  @ViewChild('container', { static: true }) container!: ElementRef;
  returnUrl: string = '/';
  userId?: any;
   // Dữ liệu cho form đăng nhập
  loginData = {
    username: '',
    password: '',
  };

  registerData = {
    username: '',
    email: '',
    password: '',
  };
  constructor(private renderer: Renderer2,
    private shareData: LoginServices,
    private LoginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

   ngOnInit() {
    this.userId = this.LoginService.getCurrentUser();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user/flight-ticket/book';
  }

  ngAfterViewInit(): void {
    this.renderer.listen(this.registerButton.nativeElement, 'click', () => {
      this.renderer.addClass(this.container.nativeElement, 'right-panel-active');
    });

    this.renderer.listen(this.loginButton.nativeElement, 'click', () => {
      this.renderer.removeClass(this.container.nativeElement, 'right-panel-active');
    });
  }

  onLogin() {
    const { username, password } = this.loginData;
    this.LoginService.login(username, password).subscribe({
      next: (res) => {
        alert('Đăng nhập thành công!');
        // Thao tác tiếp theo: chuyển trang, lưu token,...
        localStorage.setItem('jwt_token', res.token);
        this.router.navigate(['/user/flight-ticket/book']);
      },
      error: (err) => {
        alert('Đăng nhập thất bại!');
      },
    });
  }

  onRegister() {
    const { username, email, password } = this.registerData;

    // Backend bạn có thể cần username, password, firstName, lastName...
    // Nếu backend cần, bạn nên điều chỉnh cho phù hợp.
    this.LoginService
      .register(username, email, password) // giả sử register service nhận 3 param này
      .subscribe({
        next: () => {
          alert('Đăng ký thành công!');
          // Có thể tự động chuyển sang panel login hoặc làm gì đó
          this.renderer.removeClass(this.container.nativeElement, 'right-panel-active');
          // Xóa form
          this.registerData = { username: '', email: '', password: '' };
        },
        error: () => {
          alert('Đăng ký thất bại!');
        },
      });
  }
}
