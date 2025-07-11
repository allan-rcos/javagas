import { TestBed } from '@angular/core/testing';

import { CompanyService } from './company.service';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { HttpStatusCode, provideHttpClient } from '@angular/common/http';
import { MessageResponse } from '../../../types/http/response/MessageResponse';
import requests from '../../../../testing/__constants__/requests';
import errors from '../../../../testing/__constants__/errors';
import messages from '../../../../testing/__constants__/messages';

/**
 * Unit tests for Company Service.
 * This service provides utility functions for string manipulation.
 * @group ServicesTests
 * @group CompanyService
 * @version 0.2
 * @since 0.2
 */
describe('CompanyService', () => {
  let service: CompanyService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        CompanyService,
      ],
    });
    service = TestBed.inject(CompanyService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('registerCompany', () => {
    function conflict(mockResponse: MessageResponse) {
      service.register(requests.registerCompany).subscribe({
        next: () => fail('Expected an error, not a success response'),
        error: (error) => {
          expect(error.status).toBe(HttpStatusCode.Conflict);
          expect(error.error).toEqual(mockResponse);
        },
      });
      const req = controller.expectOne(service.URL);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse, {
        status: HttpStatusCode.Conflict,
        statusText: 'Conflict',
      });
    }

    it('should register a company and return a message response', () => {
      service.register(requests.registerCompany).subscribe((response) => {
        expect(response.message).toBe(messages.companyRegisterSuccess.message);
      });
      const req = controller.expectOne(service.URL);
      expect(req.request.method).toBe('POST');
      req.flush(messages.companyRegisterSuccess);
    });
    it('should receive a BadRequest when data is invalid.', () => {
      service.register(requests.invalidRegisterCompany).subscribe({
        next: () => fail('Expected an error, not a success response'),
        error: (error) => {
          expect(error.status).toBe(errors.options.badRequest.status);
          expect(error.error).toEqual(errors.messages.invalidCompanyData);
        },
      });
      const req = controller.expectOne(service.URL);
      expect(req.request.method).toBe('POST');
      req.flush(errors.messages.invalidCompanyData, errors.options.badRequest);
    });
    it('should receive a Conflict when email already registered.', () => {
      conflict(errors.messages.emailAlreadyExists);
    });
    it('should receive a Conflict when username already registered.', () => {
      conflict(errors.messages.usernameAlreadyExists);
    });
  });
});
