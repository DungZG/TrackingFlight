import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelValue',
  standalone: false
})
export class LabelValuePipe implements PipeTransform {

  transform(value: any, list: { label: string; value: any }[]): string {
    return list?.find((x) => x.value === value)?.label || 'không';
  }

}
