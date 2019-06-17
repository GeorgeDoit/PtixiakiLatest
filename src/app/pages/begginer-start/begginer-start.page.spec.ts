import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BegginerStartPage } from './begginer-start.page';

describe('BegginerStartPage', () => {
  let component: BegginerStartPage;
  let fixture: ComponentFixture<BegginerStartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BegginerStartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BegginerStartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
