import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormModule } from '../../../common/module/form/form.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
 
@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    NzIconModule
  ]
})
export class AuthModule { }
