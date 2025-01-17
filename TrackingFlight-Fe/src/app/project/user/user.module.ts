import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { FormModule } from '../../../common/module/form/form.module';
import { NzFormModule } from 'ng-zorro-antd/form';


@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    FormModule,
    NzFormModule,
    UserRoutingModule
  ]
})
export class UserModule { }
