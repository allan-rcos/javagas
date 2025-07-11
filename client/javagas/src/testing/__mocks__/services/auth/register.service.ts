import { Observable, of } from 'rxjs';
import { MessageResponse } from '../../../../app/types/http/response/MessageResponse';
import { IFormService } from '../../../../app/types/services/form/form.service';
import { RegisterRequest } from '../../../../app/types/http/body/RegisterRequest';
import { HttpErrorResponse } from '@angular/common/http';
import messages from '../../../__constants__/messages';
import requests from '../../../__constants__/requests';
import { EventEmitter } from '@angular/core';

export class MockedRegisterService implements IFormService<RegisterRequest> {
  _error = new EventEmitter<HttpErrorResponse>();

  get error(): Observable<HttpErrorResponse> {
    return this._error.asObservable();
  }

  set error(error: HttpErrorResponse) {}

  get submit(): Observable<RegisterRequest> {
    return of(requests.register);
  }

  set submit(request: RegisterRequest) {}

  get success(): Observable<MessageResponse> {
    return of(messages.success);
  }

  set success(response: MessageResponse) {}
}
