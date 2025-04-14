import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AircraftService extends BaseService {

  protected override prefix: string = 'api/aircraft';  // Đảm bảo đây là đường dẫn đúng đến API

  // Hàm tìm kiếm nhận đối tượng searchParams thay vì các tham số riêng biệt
  public searchAircraft(searchParams: any) {
    return this.search(searchParams);  // Gọi hàm search của BaseService
  }
}
