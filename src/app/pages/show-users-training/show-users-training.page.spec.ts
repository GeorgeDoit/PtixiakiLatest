import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUsersTrainingPage } from './show-users-training.page';

describe('ShowUsersTrainingPage', () => {
  let component: ShowUsersTrainingPage;
  let fixture: ComponentFixture<ShowUsersTrainingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowUsersTrainingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUsersTrainingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
