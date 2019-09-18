import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExerciseItemPage } from './add-exercise-item.page';

describe('AddExerciseItemPage', () => {
  let component: AddExerciseItemPage;
  let fixture: ComponentFixture<AddExerciseItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExerciseItemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExerciseItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
