import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExercisePage } from './add-exercise.page';

describe('AddExercisePage', () => {
  let component: AddExercisePage;
  let fixture: ComponentFixture<AddExercisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExercisePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExercisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
