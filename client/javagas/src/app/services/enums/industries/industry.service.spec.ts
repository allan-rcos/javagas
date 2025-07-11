import { TestBed } from '@angular/core/testing';

import { IndustryService } from './industry.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment.development';

/**
 * Unit tests for IndustryService
 * This service provides utility functions for string manipulation.
 * @group ServicesTests
 * @group IndustryService
 * @version 0.2
 * @since 0.2
 */
describe('IndustryService', () => {
  let service: IndustryService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        IndustryService,
      ],
    });
    service = TestBed.inject(IndustryService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all industries', () => {
    const mockIndustries = ['INDUSTRY_1', 'INDUSTRY_2', 'INDUSTRY_3'];

    service.getAll().subscribe((industries) => {
      expect(industries).toEqual(mockIndustries);
    });

    const req = controller.expectOne(
      environment.apiUrl.concat(`/enums/industries`),
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockIndustries);
  });
});
