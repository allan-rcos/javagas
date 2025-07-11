import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { HttpStatusCode, provideHttpClient } from '@angular/common/http';
import { LoginRequest } from '../../../types/http/body/LoginRequest';
import { TokenResponse } from '../../../types/http/response/TokenResponse';
import { MessageResponse } from '../../../types/http/response/MessageResponse';
import { TokenService } from '../../storage/token/token.service';

describe('LoginService', () => {
  let service: LoginService;
  let controller: HttpTestingController;
  let tokenServiceMock: { stored: string | null };

  beforeEach(() => {
    tokenServiceMock = {
      stored: null,
    };
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: TokenService, useValue: tokenServiceMock },
        LoginService,
      ],
    });
    service = TestBed.inject(LoginService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when logged in', () => {
    it(
      'should log in a candidate and return a token response and ' +
        'save the token',
      () => {
        const mockRequest: LoginRequest = {
          username: 'TestUser',
          password: 'Strong1!',
        };
        const mockResponse: TokenResponse = {
          token: 'SampleToken123',
        };
        service.login(mockRequest).subscribe((response) => {
          expect(response).toBe(mockResponse);
          expect(service.token).toBe(mockResponse.token);
        });
        const req = controller.expectOne(service.URL);
        expect(req.request.method).toBe('POST');
      },
    );

    it('should try to log in a candidate and return an UnAuthorized', () => {
      const mockInvalidRequest: LoginRequest = {
        username: 'TestUser',
        password: 'wrong',
      };
      const mockResponse: MessageResponse = {
        message: 'Sample error message',
      };
      service.login(mockInvalidRequest).subscribe({
        next: () => fail('Expected an error, not a success response'),
        error: (error) => {
          expect(error.status).toBe(HttpStatusCode.BadRequest);
          expect(error.error).toEqual(mockResponse);
          expect(service.token).toBeNull();
        },
      });
      const req = controller.expectOne(service.URL);
      expect(req.request.method).toBe('POST');
      req.flush(mockInvalidRequest, {
        status: HttpStatusCode.Unauthorized,
        statusText: 'unauthorized',
      });
    });
  });
  describe('isAuthenticated', () => {
    it('should return false when token is null', () => {
      tokenServiceMock.stored = null;
      expect(service.isAuthenticated).toBe(false);
    });
    it('should return true when token is defined', () => {
      tokenServiceMock.stored = 'SampleToken123';
      expect(service.isAuthenticated).toBe(true);
    });
  });
});
