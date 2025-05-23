import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightTicketComponent } from './flight-ticket/flight-ticket.component';
import { LocationComponent } from './location/location.component';
import { BookingComponent } from './flight-ticket/booking/booking.component';
import { CheckinComponent } from './flight-ticket/checkin/checkin.component';
import { MybookComponent } from './flight-ticket/mybook/mybook.component';
import { PaymentComponent } from './payment/payment.component';
import { Payment_successComponent } from './payment/payment_success/payment_success.component';
import { Payment_failComponent } from './payment/payment_fail/payment_fail.component';
import { AuthGuard } from '../auth/auth.guard';
import { UserinfoComponent } from './userinfo/userinfo.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    
    children: [
      { path: 'location', component: LocationComponent,canActivate: [AuthGuard]},
      { path: 'info-user', component: UserinfoComponent , canActivate: [AuthGuard]},
      { path: 'flight-ticket', component: FlightTicketComponent , canActivate: [AuthGuard],
      children: [
        { path: 'book', component: BookingComponent },
        { path: 'check', component: CheckinComponent },
        { path: 'mybook', component: MybookComponent },
        { path: '', redirectTo: 'book', pathMatch: 'full' } 
      ] 
      },
      {path: 'payment', component: PaymentComponent},
      {path: 'payment/success', component: Payment_successComponent},
      {path: 'payment/fail', component: Payment_failComponent},
      { path: '', redirectTo: 'flight-ticket', pathMatch: 'full' }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
