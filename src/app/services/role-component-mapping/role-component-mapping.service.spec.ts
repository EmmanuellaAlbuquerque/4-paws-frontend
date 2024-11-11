import { TestBed } from '@angular/core/testing';

import { RoleComponentMappingService } from './role-component-mapping.service';

describe('RoleComponentMappingService', () => {
  let service: RoleComponentMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleComponentMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
