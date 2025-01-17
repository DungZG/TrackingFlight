import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: false,
  
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoadingComponent {

  @Input() isLoading: boolean = false;
}
