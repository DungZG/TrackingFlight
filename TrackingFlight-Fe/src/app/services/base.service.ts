import { Injectable } from '@angular/core';
import { env } from '../../common/environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  protected apiBaseUrl = `${env.baseUrl}`;
  protected prefix = '';

  constructor(
    private http: HttpClient,
  ) { }

  public getAllItems<T = any>() {
    return this.http.get<T>(this.apiBaseUrl + this.prefix);
  }

  public getItem<T = any>(id: number) {
    return this.http.get<T>(this.apiBaseUrl + this.prefix + '/' + id);
  }

  public saveWithImage<T=any>(body: FormData){
    return this.http.post<T>(this.apiBaseUrl + this.prefix, body);
  }

  public updateWithImage<T=any>(id: number, body: FormData){
    return this.http.put<T>(this.apiBaseUrl + this.prefix + '/' + id, body);
  }

  public deleteItem<T=any>(id: number){
    return this.http.delete<T>(this.apiBaseUrl + this.prefix + '/' + id);
  }

  public saveWithRawData<T=any>(body: any = null){
    return this.http.post<T>(this.apiBaseUrl + this.prefix, body);
  }

  public editWithRawData<T=any>(id: number, body: any = null){
    return this.http.put<T>(this.apiBaseUrl + this.prefix + '/' + id, body);
  }

  public getItemsWithPagination<T = any>(page: number, size: number) {
    return this.http.get<T>(`${this.apiBaseUrl + this.prefix + '/items'}?page=${page}&size=${size}`);
  }

}
