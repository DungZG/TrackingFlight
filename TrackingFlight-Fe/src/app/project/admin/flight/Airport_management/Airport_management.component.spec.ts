/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Airport_managementComponent } from './Airport_management.component';

describe('Airport_managementComponent', () => {
  let component: Airport_managementComponent;
  let fixture: ComponentFixture<Airport_managementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Airport_managementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Airport_managementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
