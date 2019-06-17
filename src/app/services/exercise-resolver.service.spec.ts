import { TestBed } from '@angular/core/testing';

import { ExerciseResolverService } from './exercise-resolver.service';

describe('ExerciseResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExerciseResolverService = TestBed.get(ExerciseResolverService);
    expect(service).toBeTruthy();
  });
});
