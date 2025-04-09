import { Component, OnInit,Inject } from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { firstValueFrom } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '../../../../../common/service/dialog.service';
@Component({
  selector: 'app-ticketdetail',
  standalone: false,
  templateUrl: './ticketdetail.component.html',
  styleUrls: ['./ticketdetail.component.css']
})
export class TicketdetailComponent implements OnInit {
    public validateForm: FormGroup;
    onClose = new EventEmitter<any | null>();
    constructor(
      @Inject(NZ_MODAL_DATA) public data: any,
    ) { }
  
    ngOnInit() {
    }
  
    async closeDialog(){
      this.onClose.emit(null);
    }

}
