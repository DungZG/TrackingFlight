import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
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
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NgTemplateOutlet } from '@angular/common';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { TicketComponent } from './ticket/ticket.component';
import { FlightComponent } from './flight/flight.component';
import { UserComponent } from './user/user.component';
import { FlightdetailComponent } from './flight/flightdetail/flightdetail.component';
import { TicketdetailComponent } from './ticket/ticketdetail/ticketdetail.component';
import { AircraftComponent } from './aircraft/aircraft.component';
import { AircraftdetailComponent } from './aircraft/aircraftdetail/aircraftdetail.component';
@NgModule({
  declarations: [
    AdminComponent,
    ChartDetailComponent,
    TicketComponent,
    FlightComponent,
    FlightdetailComponent,
    TicketdetailComponent,
    UserComponent,
    AircraftComponent,
    AircraftdetailComponent
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
    NzImageModule,
    NgTemplateOutlet
  ]
})
export class AdminModule { }
