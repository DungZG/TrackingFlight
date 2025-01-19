import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { FormModule } from '../../../common/module/form/form.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { LocationComponent } from './location/location.component';
import { FlightTicketComponent } from './flight-ticket/flight-ticket.component';


@NgModule({
  declarations: [
    UserComponent,
    LocationComponent,
    FlightTicketComponent
  ],
  imports: [
    CommonModule,
    FormModule,
    NzFormModule,
    UserRoutingModule
  ]
})
export class UserModule { }
