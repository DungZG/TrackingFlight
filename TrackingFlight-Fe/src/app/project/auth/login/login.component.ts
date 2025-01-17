import { Component, AfterViewInit, ElementRef, Renderer2, ViewChild } from '@angular/core';

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

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.listen(this.registerButton.nativeElement, 'click', () => {
      this.renderer.addClass(this.container.nativeElement, 'right-panel-active');
    });

    this.renderer.listen(this.loginButton.nativeElement, 'click', () => {
      this.renderer.removeClass(this.container.nativeElement, 'right-panel-active');
    });
  }
}
