import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightTicketComponent } from './flight-ticket/flight-ticket.component';
import { LocationComponent } from './location/location.component';
import { BookingComponent } from './flight-ticket/booking/booking.component';
import { CheckinComponent } from './flight-ticket/checkin/checkin.component';
import { MybookComponent } from './flight-ticket/mybook/mybook.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'location', component: LocationComponent },
      { path: 'flight-ticket', component: FlightTicketComponent , 
      children: [
        { path: 'book', component: BookingComponent },
        { path: 'check', component: CheckinComponent },
        { path: 'mybook', component: MybookComponent },
        { path: '', redirectTo: 'book', pathMatch: 'full' } 
      ] 
      },
      { path: 'payment', component: PaymentComponent },
      { path: '', redirectTo: 'flight-ticket', pathMatch: 'full' }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
