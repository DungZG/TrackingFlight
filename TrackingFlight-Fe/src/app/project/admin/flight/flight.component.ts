import { Component, OnInit } from '@angular/core';
import { DialogService, DialogSize } from '../../../../common/service/dialog.service';
import {
  FormBuilder,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,

} from '@angular/forms';
@Component({
  selector: 'app-flight',
  standalone: false,
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.scss'
})
export class FlightComponent{
  isPanelOpen = true;
    
      controlArray: Array<{ index: number; show: boolean }> = [];
      isCollapse = true;
      public validateForm: FormGroup;
      i = 0;
      editId: string | null = null;

      public listType: any=[

      ]
      public listCompany: any=[

      ]

      constructor(
        private fb: FormBuilder,
        private dialogService: DialogService,
      ) {
        this.validateForm = this.fb.group({
          ticketname: [null, [Validators.required]],
          flightcode: [null, [Validators.required]],
          flightType: [null, [Validators.required]],
          flightCompany:  [null, [Validators.required]]
        });
      }

  ngOnInit() {
  }

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
    this.controlArray.forEach((c, index) => {
      c.show = this.isCollapse ? index < 6 : true;
    });
  }

  resetForm(): void {
    this.validateForm.reset();
  }


  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }
}
