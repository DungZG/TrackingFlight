import { Component, OnInit,EventEmitter } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NgTemplateOutlet } from '@angular/common';
@Component({
  selector: 'app-Aircraft-detail',
  standalone: true,
  imports:[
    NzIconModule,
    NzMenuModule,
    NgTemplateOutlet,
  ],
  templateUrl: './Aircraft-detail.component.html',
  styleUrls: ['./Aircraft-detail.component.css']
})
export class AircraftDetailComponent implements OnInit {
   onClose = new EventEmitter<any | null>();
   mode = false;
  dark = false;
  menus = [
    {
      level: 1,
      title: 'Mail Group',
      icon: 'mail',
      open: true,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          title: 'Group 1',
          icon: 'bars',
          open: false,
          selected: false,
          disabled: false,
          children: [
            {
              level: 3,
              title: 'Option 1',
              selected: false,
              disabled: false
            },
            {
              level: 3,
              title: 'Option 2',
              selected: false,
              disabled: true
            }
          ]
        },
        {
          level: 2,
          title: 'Group 2',
          icon: 'bars',
          selected: true,
          disabled: false
        },
        {
          level: 2,
          title: 'Group 3',
          icon: 'bars',
          selected: false,
          disabled: false
        }
      ]
    },
    {
      level: 1,
      title: 'Team Group',
      icon: 'team',
      open: false,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          title: 'User 1',
          icon: 'user',
          selected: false,
          disabled: false
        },
        {
          level: 2,
          title: 'User 2',
          icon: 'user',
          selected: false,
          disabled: false
        }
      ]
    }
  ];
  constructor() { }

  ngOnInit() {
  }

  async closeDialog() {
    this.onClose.emit(null);
  } 

}
