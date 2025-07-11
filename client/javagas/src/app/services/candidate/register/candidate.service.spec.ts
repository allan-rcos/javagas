import { TestBed } from '@angular/core/testing';

import { CandidateService } from './candidate.service';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { HttpStatusCode, provideHttpClient } from '@angular/common/http';
import { MessageResponse } from '../../../types/http/response/MessageResponse';
import errors from '../../../../testing/__constants__/errors';
import requests from '../../../../testing/__constants__/requests';
import messages from '../../../../testing/__constants__/messages';

/**
 * Unit tests for Candidate Service.
 * This service provides utility functions for candidate registration.
 * @group ServicesTests
 * @group CandidateService
 * @version 0.2
 * @since 0.2
 */
describe('CandidateService', () => {
  let service: CandidateService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        CandidateService,
      ],
    });
    service = TestBed.inject(CandidateService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('registerCandidate', () => {
    function conflict(mockResponse: MessageResponse) {
      service.register(requests.registerCandidate).subscribe({
        next: () => fail('Expected an error, not a success response'),
        error: (error) => {
          expect(error.status).toBe(HttpStatusCode.Conflict);
          expect(error.error).toEqual(mockResponse);
        },
      });
      const req = controller.expectOne(service.URL);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse, errors.options.conflict);
    }

    it('should register a candidate and return a message response', () => {
      service.register(requests.registerCandidate).subscribe((response) => {
        expect(response.message).toBe(
          messages.candidateRegisterSuccess.message,
        );
      });
      const req = controller.expectOne(service.URL);
      expect(req.request.method).toBe('POST');
    });
    it('should receive a BadRequest when data is invalid.', () => {
      service.register(requests.registerCandidate).subscribe({
        next: () => fail('Expected an error, not a success response'),
        error: (error) => {
          expect(error.status).toBe(HttpStatusCode.BadRequest);
          expect(error.error).toEqual(errors.messages.invalidCandidateData);
        },
      });
      const req = controller.expectOne(service.URL);
      expect(req.request.method).toBe('POST');
      req.flush(
        errors.messages.invalidCandidateData,
        errors.options.badRequest,
      );
    });
    it('should receive a Conflict when email already registered.', () => {
      conflict(errors.messages.emailAlreadyExists);
    });
    it('should receive a Conflict when username already registered.', () => {
      conflict(errors.messages.usernameAlreadyExists);
    });
  });
});
