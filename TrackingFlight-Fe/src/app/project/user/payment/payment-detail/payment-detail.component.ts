import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { PaymentDetailService } from '../payment.service';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
interface Info {
  name: string;
  gender: string;
  email: string;
  sdt: string;
}
@Component({
  selector: 'app-payment-detail',
  standalone:false,
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {
  public validateForm:FormGroup;
  public listGender: any[] =[
    {value:"Nam",label:"Nam"},
    {value:"Nữ",label:"Nữ"}
  ]
  onClose = new EventEmitter<any | null>();
  @Output() infoSubmitted = new EventEmitter<Info>();
  public name: string = '';
  public gender: string = '';
  public email: string = '';
  public sdt: string = '';
    constructor(
      public shareData: PaymentDetailService,
      public fb: FormBuilder,
    ) { 
      this.validateForm = this.fb.group({
        name : [null,[Validators.required]],
        gender: [null,[Validators.required]],
        email: [null,[Validators.required]],
        sdt: [null,[Validators.required]],
      })
    }
  
     ngOnInit():void {
      this.shareData.onClose = this.onClose;
    }
  
    async closeDialog(){
      this.shareData.closeDialog()
    }

    onSubmit() {
      this.name = this.validateForm.get('name')?.value;
      this.gender = this.validateForm.get('gender')?.value;
      this.email = this.validateForm.get('email')?.value;
      this.sdt = this.validateForm.get('sdt')?.value;
      // const info = `${this.name}, ${this.gender}, ${this.email}, ${this.sdt}`;
      const Info = {
        name: this.name,
        gender: this.gender,
        email: this.email,
        sdt: this.sdt
      };
      this.infoSubmitted.emit(Info);
      this.closeDialog();             
    }

}
