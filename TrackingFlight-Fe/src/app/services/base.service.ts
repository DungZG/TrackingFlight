import { Injectable } from '@angular/core';
import { env } from '../../common/environment/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { Payment } from '../project/user/payment/payment-response.model';
@Injectable({
  providedIn: 'root'
})
export class BaseService {

  protected apiBaseUrl = `${env.baseUrl}`;
  protected prefix = '';

  constructor(private http: HttpClient) {}

  public getAllItems<T = any>(endpoint: string = '/all') {
    return this.http.get<T>(this.apiBaseUrl + this.prefix + endpoint);
  }

  public getItem<T = any>(id: number, endpoint: string = '') {
    return this.http.get<T>(this.apiBaseUrl + this.prefix + endpoint + '/' + id);
  }

  public saveWithImage<T = any>(body: FormData, endpoint: string = '') {
    return this.http.post<T>(this.apiBaseUrl + this.prefix + endpoint, body);
  }

  public updateWithImage<T = any>(id: number, body: FormData, endpoint: string = '') {
    return this.http.put<T>(this.apiBaseUrl + this.prefix + endpoint + '/' + id, body);
  }

  public deleteItem<T = any>(id: number, endpoint: string = '') {
    return this.http.delete<T>(this.apiBaseUrl + this.prefix + endpoint + '/' + id);
  }

  public saveWithRawData<T = any>(body: any = null, endpoint: string = '') {
    return this.http.post<T>(this.apiBaseUrl + this.prefix + endpoint, body);
  }

  public editWithRawData<T = any>(id: number, body: any = null, endpoint: string = '') {
    return this.http.put<T>(this.apiBaseUrl + this.prefix + endpoint + '/' + id, body);
  }

  public getItemsWithPagination<T = any>(page: number, size: number, endpoint: string = '/items') {
    return this.http.get<T>(`${this.apiBaseUrl + this.prefix + endpoint}?page=${page}&size=${size}`);
  }

  public search<T = any>(searchParams: any, endpoint: string = '/search') {
    const params = new URLSearchParams(searchParams).toString();
    return this.http.get<T>(`${this.apiBaseUrl + this.prefix + endpoint}?${params}`);
  }


  getReturnFlightByGroupId(groupId: number): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl + this.prefix}/return-flight/${groupId}`);
  }

  createPayment(amount: number, bankCode?: string, language?: string): Observable<Payment> {
    const params = new URLSearchParams();
    params.set('amount', amount.toString());
    if (bankCode) params.set('bankCode', bankCode);
    if (language) params.set('language', language);

    return this.http.get<Payment>(`${this.apiBaseUrl + this.prefix}/create_payment?${params.toString()}`);
  }
  
}
