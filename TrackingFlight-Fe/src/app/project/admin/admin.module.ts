import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { StaffDetailComponent } from './staff-detail/staff-detail.component';
import { FormModule } from '../../../common/module/form/form.module';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzFormModule,NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ChartDetailComponent } from './chart-detail/chart-detail.component';
import { StaffDetailAddComponent } from './staff-detail/staff-detail-add/staff-detail-add.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { TicketComponent } from './ticket/ticket.component';
import { FlightComponent } from './flight/flight.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { Manage_airline_ticketsComponent } from './ticket/Manage_airline_tickets/Manage_airline_tickets.component';
import { AircraftManagementComponent } from './flight/Aircraft-management/Aircraft-management.component';
import { Airport_managementComponent } from './flight/Airport_management/Airport_management.component';
import { Flight_route_managementComponent } from './flight/Flight_route_management/Flight_route_management.component';
import { FlightManagementComponent } from './flight/Flight-management/Flight-management.component';
import { ManageFlightSchedulesComponent } from './flight/Manage-flight-schedules/Manage-flight-schedules.component';
import { RouteManagementComponent } from './flight/Route-management/Route-management.component';
import { ManageBookingsComponent } from './ticket/Manage-bookings/Manage-bookings.component';
@NgModule({
  declarations: [
    AdminComponent,
    ChartDetailComponent,
    StaffDetailComponent,
    StaffDetailAddComponent,
    CustomerDetailComponent,
    TicketComponent,
    Manage_airline_ticketsComponent,
    ManageBookingsComponent,
    
    FlightComponent,
    AircraftManagementComponent,
    Airport_managementComponent,
    Flight_route_managementComponent,
    FlightManagementComponent,
    ManageFlightSchedulesComponent,
    RouteManagementComponent,
    CustomerComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzMenuModule,
    FormModule,
    NzCollapseModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzCheckboxModule,
    NzSelectModule,
    NzTableModule,
    NzModalModule,
    NzCardModule,
    NzGridModule,
    NzAvatarModule,
    NzSkeletonModule,
    NzSwitchModule,
    NzImageModule
  ]
})
export class AdminModule { }
