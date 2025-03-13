import { Component, OnInit } from '@angular/core';
import { MybookService } from './mybook.service';

@Component({
  selector: 'app-mybook',
  standalone: false,
  templateUrl: './mybook.component.html',
  styleUrls: ['./mybook.component.css']
})
export class MybookComponent implements OnInit {
  public validatesForm:any;
  constructor(
    public shareDate: MybookService,
  ) { 
    this.validatesForm = this.shareDate.myForm
  }

  ngOnInit() {
  }

}
