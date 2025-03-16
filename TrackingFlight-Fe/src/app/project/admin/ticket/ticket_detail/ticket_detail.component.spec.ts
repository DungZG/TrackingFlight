/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Ticket_detailComponent } from './ticket_detail.component';

describe('Ticket_detailComponent', () => {
  let component: Ticket_detailComponent;
  let fixture: ComponentFixture<Ticket_detailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ticket_detailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ticket_detailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
