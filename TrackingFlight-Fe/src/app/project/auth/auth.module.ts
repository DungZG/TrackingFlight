import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormModule } from '../../../common/module/form/form.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Error404Component } from './error-404/error-404.component';
import { NzResultModule } from 'ng-zorro-antd/result';
import { Error403Component } from './error-403/error-403.component';
 
@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    Error404Component,
    Error403Component
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    FormModule,
    NzIconModule,
    NzResultModule
  ]
})
export class AuthModule { }
