import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-user',
  standalone: false,
  
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      dateRange: [null], 
    });
  }
}
