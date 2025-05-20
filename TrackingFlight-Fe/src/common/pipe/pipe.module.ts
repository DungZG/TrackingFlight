import { NgModule } from '@angular/core';
import { LabelValuePipe } from './label-value.pipe';
import { CommonModule } from '@angular/common';
import { ViDateFormatPipe } from './vi-date-format.pipe';
import { ViDatePipe } from './vi-date.pipe';


@NgModule({
  declarations: [
    LabelValuePipe,
    ViDateFormatPipe,
    ViDatePipe
  ],
  imports: [CommonModule],
  exports: [
    LabelValuePipe,
    ViDateFormatPipe,
    ViDatePipe
  ]
})
export class PipeModule { }
