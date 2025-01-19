import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightTicketComponent } from './flight-ticket/flight-ticket.component';
import { LocationComponent } from './location/location.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'location', component: LocationComponent },
      { path: 'flight-ticket', component: FlightTicketComponent },

      { path: '', redirectTo: 'user/location', pathMatch: 'full' }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
