import { TestBed } from '@angular/core/testing';

import { RegisterService } from './register.service';
import { RegisterRequest } from '../../../types/http/body/RegisterRequest';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { MessageResponse } from '../../../types/http/response/MessageResponse';
import { environment } from '../../../../environments/environment.development';

/**
 * Unit tests for Register Service.
 * This service is responsible for handling user registration.
 * @group ServicesTests
 * @group RegisterService
 * @version 0.2
 * @since 0.2
 */
describe('Register', () => {
  let service: RegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit submit event', (done) => {
    const user: RegisterRequest = {
      username: 'testuser',
      password: 'Strong1!',
      email: 'test@test.dev',
    };
    service.submit.subscribe((data) => {
      expect(data).toEqual(user);
      done();
    });
    service.submit = user;
  });

  it('should emit error event', (done) => {
    const body: MessageResponse = {
      message: 'Registration failed',
    };
    const error = new HttpErrorResponse({
      error: body,
      status: HttpStatusCode.Conflict,
      statusText: 'Conflict',
      url: environment.apiUrl.concat('/auth/candidate/register'),
    });
    service.error.subscribe((err) => {
      expect(err.error).toBe(body);
      expect(err.status).toBe(HttpStatusCode.Conflict);
      done();
    });
    service.error = error;
  });

  it('should emit success event', (done) => {
    const body: MessageResponse = {
      message: 'Registration successful',
    };
    service.success.subscribe((response) => {
      expect(response).toEqual(body);
      done();
    });
    service.success = body;
  });
});
