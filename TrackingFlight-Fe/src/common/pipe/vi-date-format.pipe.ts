import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'viDateFormat',
  standalone: false
})
export class ViDateFormatPipe implements PipeTransform {

  transform(value: string | Date): string {
    if (!value) return '';

    const date = new Date(value);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

    return `Ngày ${day} Tháng ${month} Năm ${year} | ${hour}H${minute}`;
  }

}