import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightTicketComponent } from './flight-ticket.component';
import { BookingComponent } from './booking/booking.component';
import { CheckinComponent } from './checkin/checkin.component';
import { MybookComponent } from './mybook/mybook.component';

const routes: Routes = [
  {
    path: 'user/flight-ticket',
    component: FlightTicketComponent,
    children: [
      { path: 'book', component: BookingComponent },
      { path: 'check', component: CheckinComponent },
      { path: 'mybook', component: MybookComponent },
      { path: '', redirectTo: 'book', pathMatch: 'full' } 
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlightTicketRoutingModule { }
