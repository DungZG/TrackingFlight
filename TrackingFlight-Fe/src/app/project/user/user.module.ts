import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { FormModule } from '../../../common/module/form/form.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { LocationComponent } from './location/location.component';
import { FlightTicketComponent } from './flight-ticket/flight-ticket.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FlightTicketRoutingModule } from './flight-ticket/flight-ticket-routing.module';
import { BookingComponent } from './flight-ticket/booking/booking.component';
import { CheckinComponent } from './flight-ticket/checkin/checkin.component';
import { MybookComponent } from './flight-ticket/mybook/mybook.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { FlightdetailComponent } from './flight-ticket/flightdetail/flightdetail.component';
import { DatePipe } from '@angular/common';
import { BookingdetailComponent } from './flight-ticket/booking/bookingdetail/bookingdetail.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { PaymentComponent } from './payment/payment.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { PaymentDetailComponent } from './payment/payment-detail/payment-detail.component';
import { PaymentFlightdetailComponent } from './payment/payment-flightdetail/payment-flightdetail.component';
@NgModule({
  declarations: [
    UserComponent,
    LocationComponent,
    FlightTicketComponent,
    BookingComponent,
    CheckinComponent,
    MybookComponent,
    FlightdetailComponent,
    BookingdetailComponent,
    PaymentComponent,
    PaymentDetailComponent,
    PaymentFlightdetailComponent
  ],
  imports: [
    CommonModule,
    FormModule,
    FormModule,
    NzFormModule,
    UserRoutingModule,
    FlightTicketRoutingModule,
    NzMenuModule,
    NzIconModule,
    NzSelectModule,
    FormsModule,
    NzInputModule,
    NzAutocompleteModule,
    NzRadioModule,
    NzDatePickerModule,
    NzButtonModule,
    NzInputNumberModule,
    NzCarouselModule,
    NzTimelineModule,
    NzStepsModule,
    NzCheckboxModule
  ],
  providers: [DatePipe],
})
export class UserModule { }
