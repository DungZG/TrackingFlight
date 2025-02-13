import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogConfirmMode } from '../../service/dialog.service';
import { ValidatorExtension } from '../../validator-extension';
import { FormModule } from '../form/form.module';
@Component({
  selector: 'app-dialog-confirm-data',
  standalone: true,
  imports:[FormModule],
  templateUrl: './dialog-confirm-data.component.html',
  styleUrls: ['./dialog-confirm-data.component.scss']
})
export class DialogConfirmDataComponent implements OnInit {

  @Input() mode: string = DialogConfirmMode.alert;
  @Input() content!: string;
  @Input() okText: string = 'Xác nhận';
  @Input() cancelText: string = 'Hủy';
  @Input() labelText: string = 'Nội dung';
  @Input() requiredValid: boolean = false;
  @Input() maxLength: number | null = null;
  @Output() onClose = new EventEmitter<any>();

  public dialogConfirmMode = DialogConfirmMode;
  public myForm: FormGroup;
  private requiredV: any = ValidatorExtension.required();

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      note: ['', ValidatorExtension.required]
    });
  }

  ngOnInit() {
    if (this.requiredValid) {
      this.myForm.get('note')?.addValidators(this.requiredV);
    } else {
      this.myForm.get('note')?.removeValidators(this.requiredV);
    }

    if (this.maxLength) {
      this.myForm.get('note')?.addValidators(ValidatorExtension.maxLength(this.maxLength));
    }
  }

  ok() {
    Object.values(this.myForm.controls).forEach(control => control.markAsDirty());
    if (this.myForm.invalid) return;
    this.onClose.emit({
      result: true,
      ...this.myForm.getRawValue()
    });
  }

  cancel() {
    this.onClose.emit({
      result: false,
      note: null
    });
  }

}
