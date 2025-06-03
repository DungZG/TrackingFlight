import { Component, AfterViewInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { LoginServices } from './login.service';
import {LoginService} from '../../../services/login.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../../common/service/message.service';
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
    private route: ActivatedRoute,
    private messagerService: MessageService
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
        this.messagerService.notiMessageSuccess('Đăng nhập thành công')
        localStorage.setItem('jwt_token', res.token);
        this.router.navigate(['/user/flight-ticket/book']);
      },
      error: (err) => {
        this.messagerService.notiMessageError('Đăng nhập thất bại')
      },
    });
  }

  onRegister() {
    const { username, email, password } = this.registerData;
    this.LoginService
      .register(username, email, password)
      .subscribe({
        next: () => {
          this.messagerService.notiMessageSuccess('Đăng ký thành công')
          this.renderer.removeClass(this.container.nativeElement, 'right-panel-active');
          this.registerData = { username: '', email: '', password: '' };
        },
        error: () => {
           this.messagerService.notiMessageError('Đăng ký thất bại!');
        },
      });
  }
}
