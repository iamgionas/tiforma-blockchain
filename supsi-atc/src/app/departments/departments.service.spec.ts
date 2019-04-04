import { TestBed } from '@angular/core/testing';

import { DepartmentsService } from './departments.service';

describe('DepartmentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepartmentsService = TestBed.get(DepartmentsService);
    expect(service).toBeTruthy();
  });
});
