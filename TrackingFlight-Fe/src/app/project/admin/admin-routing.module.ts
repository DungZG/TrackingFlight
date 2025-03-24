import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ChartDetailComponent } from './chart-detail/chart-detail.component';
import { TicketComponent } from './ticket/ticket.component';
import { FlightComponent } from './flight/flight.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'charts', component: ChartDetailComponent },
      { path: 'ticket', component: TicketComponent },
      { path: 'flight', component: FlightComponent},
      { path: 'user', component: UserComponent},
      { path: '', redirectTo: 'user', pathMatch: 'full' } // Đường dẫn mặc định
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
