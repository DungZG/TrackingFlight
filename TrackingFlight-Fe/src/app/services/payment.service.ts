import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseService{

  protected override prefix: string = 'api/payment';


  
}
