import { NgModule } from '@angular/core';
import { LabelValuePipe } from './label-value.pipe';


@NgModule({
  declarations: [
    LabelValuePipe,
  ],
  exports: [
    LabelValuePipe,
  ]
})
export class PipeModule { }
