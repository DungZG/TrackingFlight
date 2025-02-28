import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AircraftService extends BaseService{

  protected override prefix: string = 'aircraft';

}
