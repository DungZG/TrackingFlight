import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { InputTextSearchComponent } from '../../base/input-text-search/input-text-search.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputSelectComponent } from '../../base/input-select/input-select.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { InputTextComponent } from '../../base/input-text/input-text.component';
import { InputImageComponent } from '../../base/input-image/input-image.component';
import { PipeModule } from '../../pipe/pipe.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { LoadingComponent } from '../../base/loading/loading.component';
import { InputDateRangeComponent } from '../../base/input-date-range/input-date-range.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { RenderErrorsComponent } from '../render-errors/render-errors.component';
import { FormControlComponent } from '../form-control/form-control.component';

@NgModule({
  declarations: [
    InputTextSearchComponent,
    InputSelectComponent,
    InputTextComponent,
    InputImageComponent,
    InputDateRangeComponent,
    LoadingComponent,
    FormControlComponent,
    RenderErrorsComponent,
  ],
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    FormsModule,
    NzSelectModule,
    NzTabsModule,
    NzTableModule,
    NzToolTipModule,
    ReactiveFormsModule,
    PipeModule,
    NzSpinModule,
    NzDatePickerModule,
    // NzButtonModule,
  ],
  exports: [
    InputTextSearchComponent,
    InputSelectComponent,
    InputDateRangeComponent,
    NzTabsModule,
    NzTableModule,
    NzToolTipModule,
    NzDatePickerModule,
    NzIconModule,
    ReactiveFormsModule,
    InputTextComponent,
    InputImageComponent,
    PipeModule,
    NzSpinModule,
    LoadingComponent,
    // NzButtonModule,
    FormsModule,
    FormControlComponent,
    RenderErrorsComponent
  ]
})
export class FormModule { }
