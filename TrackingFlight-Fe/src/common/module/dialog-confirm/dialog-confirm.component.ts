import { Component, EventEmitter, Input, OnInit, Output ,Inject} from '@angular/core';
import { DialogConfirmMode } from '../../service/dialog.service';
import { FormModule } from '../form/form.module';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-dialog-confirm',
  standalone: true,
  imports:[FormModule],
  templateUrl: './dialog-confirm.component.html',
  styleUrl: './dialog-confirm.component.scss'
})
export class DialogConfirmComponent implements OnInit {

  @Input() mode: string = DialogConfirmMode.alert;
  @Input() content!: string;
  @Input() okText: string | undefined;
  @Input() cancelText: string | undefined;
  @Output() onClose = new EventEmitter<boolean>();

  public dialogConfirmMode = DialogConfirmMode;

  constructor(@Inject(NZ_MODAL_DATA) public data: any,) { 
    this.content = data.content;
    this.okText = data.okText;
    this.cancelText = data.cancelText;
  }

  ngOnInit() {
  }

  ok() {
    this.onClose.emit(true);
  }

  cancel() {
    this.onClose.emit(false);
  }

}
