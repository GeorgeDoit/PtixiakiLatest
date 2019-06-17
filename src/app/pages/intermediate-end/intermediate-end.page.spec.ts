import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntermediateEndPage } from './intermediate-end.page';

describe('IntermediateEndPage', () => {
  let component: IntermediateEndPage;
  let fixture: ComponentFixture<IntermediateEndPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntermediateEndPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntermediateEndPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
