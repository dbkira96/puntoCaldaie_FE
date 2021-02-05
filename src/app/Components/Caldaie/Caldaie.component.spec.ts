/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CaldaieComponent } from './Caldaie.component';

describe('CaldaieComponent', () => {
  let component: CaldaieComponent;
  let fixture: ComponentFixture<CaldaieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaldaieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaldaieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
