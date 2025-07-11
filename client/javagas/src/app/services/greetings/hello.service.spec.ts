import { TestBed } from '@angular/core/testing';

import { HelloService } from './hello.service';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

/**
 * Unit tests for HelloService
 * This service provides utility functions for string manipulation.
 * @group ServicesTests
 * @group HelloService
 * @version 0.2
 * @since 0.2
 */
describe('HelloService', () => {
  let service: HelloService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        HelloService,
      ],
    });
    service = TestBed.inject(HelloService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a greeting', () => {
    const mockResponse = { message: 'Hello, World!' };

    service.get().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = controller.expectOne(
      environment.apiUrl.concat(`/greeting/hello`),
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
