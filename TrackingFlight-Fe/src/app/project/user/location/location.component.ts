import { FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
@Component({
  selector: 'app-location',
  standalone: false,
  
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {
  formGroup!: FormGroup;
  constructor(
    
  ){}
}
