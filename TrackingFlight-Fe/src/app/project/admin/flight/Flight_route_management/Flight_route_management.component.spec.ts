/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Flight_route_managementComponent } from './Flight_route_management.component';

describe('Flight_route_managementComponent', () => {
  let component: Flight_route_managementComponent;
  let fixture: ComponentFixture<Flight_route_managementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Flight_route_managementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Flight_route_managementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
