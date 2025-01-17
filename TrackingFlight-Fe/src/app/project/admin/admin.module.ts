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
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ChartDetailComponent } from './chart-detail/chart-detail.component';
import { StaffDetailAddComponent } from './staff-detail/staff-detail-add/staff-detail-add.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
@NgModule({
  declarations: [
    AdminComponent,
    StaffDetailComponent,
    ChartDetailComponent,
    StaffDetailAddComponent,
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
  ]
})
export class AdminModule { }
