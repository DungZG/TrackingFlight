import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FlightService extends BaseService{

  protected override prefix: string = 'api/flight';

  private selectedFlightSubject = new BehaviorSubject<any>(null);
  selectedFlight$ = this.selectedFlightSubject.asObservable();

  setSelectedFlight(flight: any) {
    this.selectedFlightSubject.next(flight);
  }

  getSelectedFlight() {
    return this.selectedFlightSubject.getValue();
  }

  // Tạo chuyến bay một chiều
  createFlight(body: any): Observable<any> {
    // Gọi POST đến api/flight/create
    return this.saveWithRawData(body, '/create');
  }

  // Tạo chuyến bay khứ hồi (gọi 2 lần API tạo 2 chuyến)
  createRoundTripFlight(outboundPayload: any, returnPayload: any): Observable<any[]> {
    return forkJoin([
      this.createFlight(outboundPayload),
      this.createFlight(returnPayload)
    ]);
  }

  // Tìm kiếm chuyến bay, truyền params dưới dạng object
  searchFlights(params: any): Observable<any> {
  // Chuyển các giá trị ngày giờ sang timestamp millis nếu là Date hoặc string
  const searchParams = { ...params };

  if (params.departureTime instanceof Date) {
    searchParams.departureTime = params.departureTime.getTime();
  }
  if (params.returnDepartureTime instanceof Date) {
    searchParams.returnDepartureTime = params.returnDepartureTime.getTime();
  }

  return this.search(searchParams);
}

  


}
