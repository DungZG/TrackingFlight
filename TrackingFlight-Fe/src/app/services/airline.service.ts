import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AirlineService extends BaseService{

  protected override prefix: string = 'api/airline';

}
