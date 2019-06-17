import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntermediatePage } from './intermediate.page';

describe('IntermediatePage', () => {
  let component: IntermediatePage;
  let fixture: ComponentFixture<IntermediatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntermediatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntermediatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
