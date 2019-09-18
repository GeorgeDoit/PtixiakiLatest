import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTrainingPage } from './my-training.page';

describe('MyTrainingPage', () => {
  let component: MyTrainingPage;
  let fixture: ComponentFixture<MyTrainingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTrainingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTrainingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
