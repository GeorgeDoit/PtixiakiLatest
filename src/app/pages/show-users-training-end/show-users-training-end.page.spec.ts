import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUsersTrainingEndPage } from './show-users-training-end.page';

describe('ShowUsersTrainingEndPage', () => {
  let component: ShowUsersTrainingEndPage;
  let fixture: ComponentFixture<ShowUsersTrainingEndPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowUsersTrainingEndPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUsersTrainingEndPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
