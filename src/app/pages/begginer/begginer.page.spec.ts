import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BegginerPage } from './begginer.page';

describe('BegginerPage', () => {
  let component: BegginerPage;
  let fixture: ComponentFixture<BegginerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BegginerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BegginerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
