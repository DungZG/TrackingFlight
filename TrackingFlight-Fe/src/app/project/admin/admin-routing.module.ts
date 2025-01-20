import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { StaffDetailComponent } from './staff-detail/staff-detail.component';
import { ChartDetailComponent } from './chart-detail/chart-detail.component';
import { TicketComponent } from './ticket/ticket.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'staff', component: StaffDetailComponent },
      { path: 'charts', component: ChartDetailComponent },
      { path: 'ticket', component: TicketComponent },
      { path: '', redirectTo: 'staff', pathMatch: 'full' } // Đường dẫn mặc định
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
